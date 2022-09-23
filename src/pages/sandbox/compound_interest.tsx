import { SetStateAction, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('@components/line_chart/LineChart'), { ssr: false });

import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';

import MinusButton from 'public/images/icons/calc_minus_button.svg';
import PlusButton from 'public/images/icons/calc_plus_button.svg';
import { colorTheme } from 'src/recoil/atoms/colorTheme';
import styles from 'src/styles/sandbox/compound_interest.module.scss';
import { convertZenkakuToHankakuNumber } from 'src/utils/convertZenkakuToHankaku';

type AssetDataType = {
  [id: string]: {
    capital: number | string;
  };
};

const CompoundInterest: NextPage = ({}) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);
  const originalDarkMode = isDarkMode;
  const [year, setYear] = useState(30);
  const [interestRate, setInterestRate] = useState(5);
  const [zenkakuError, setZenkakuError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const initialAssetData = () => {
    const id = uuid();
    return {
      [id]: {
        capital: 100,
      },
    };
  };
  const [assetData, setAssetData] = useState<AssetDataType>({ ...initialAssetData() });

  useEffect(() => {
    //TODO:ダークモードのCSS設定するまではlight表示固定
    setIsDarkMode('light');
    return () => {
      setIsDarkMode(originalDarkMode);
    };
  }, [isDarkMode]);

  useEffect(() => {
    const allDataFilled = Object.keys(assetData).every((id) => assetData[id].capital !== (0 || null));
    if (allDataFilled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [assetData]);

  const assetFormInputHandler = (
    which: 'capital',
    id: string,
    value: number,
    setAssetData: (value: SetStateAction<AssetDataType>) => void,
    assetData: AssetDataType,
  ) => {
    if (value !== null && which === 'capital') {
      //   (landAreaFloatNumberRegex.test(value) || !value) &&
      setAssetData({ ...assetData, [id]: { ...assetData[id], capital: value } });
    }
  };

  const addAssetInputsRowHandler = () => {
    setAssetData({ ...assetData, ...initialAssetData() });
  };

  const deleteAssetInputsRowHandler = (id: string) => {
    const { [id]: deleteData, ...newData } = assetData;
    setAssetData(newData);
  };

  const currentYear = new Date().getFullYear();
  const list: {
    year: number;
    [key: string]: number;
  }[] = [];
  const interestPercent = interestRate / 100;
  Object.values(assetData).map((data, index) => {
    for (let i = 0; i < year; i++) {
      //元本*(1+利率)^年数
      if (index === 0) {
        list.push({ year: currentYear + i, [`資産${index + 1}`]: Math.round(Number(data.capital) * (1 + interestPercent) ** i) });
      } else {
        //資産2以降の処理は追加のみ
        list[i][`資産${index + 1}`] = Math.round(Number(data.capital) * (1 + interestPercent) ** i);
      }
    }
  });

  console.log('year, list', year, list);

  return (
    <>
      <div className={styles.calc_section}>
        <h1 className={styles.page_title}>複利計算チャート</h1>
        {Object.entries(assetData).map(([id, { capital }], index) => {
          return (
            <div className={styles.asset_input_form} key={id}>
              <span className={styles.input_label}>{'資産' + String(index + 1)}</span>
              <input
                type="text"
                inputMode="numeric"
                className={styles.asset_input_area}
                autoComplete="off"
                placeholder=""
                maxLength={6}
                value={capital ? capital.toLocaleString() : ''}
                onKeyDown={(e) => {
                  e.code === 'KeyE' && e.preventDefault();
                }}
                onChange={(e) => {
                  isNaN(Number(convertZenkakuToHankakuNumber(e.target.value))) && setZenkakuError(true);
                  !isNaN(Number(convertZenkakuToHankakuNumber(e.target.value))) &&
                    (assetFormInputHandler('capital', id, convertZenkakuToHankakuNumber(e.target.value), setAssetData, assetData), setZenkakuError(false));
                }}
              />
              <span className={styles.unit_label}>万円</span>
              <button
                className={styles.remove_report_button}
                onClick={() => {
                  deleteAssetInputsRowHandler(id);
                }}
                disabled={Object.keys(assetData).length === 1}
              >
                <MinusButton className={`${Object.keys(assetData).length > 1 ? styles.is_active : styles.is_disabled} ${styles.remove_button_icon}`} />
              </button>
            </div>
          );
        })}

        {Object.keys(assetData).length < 8 && (
          <button onClick={addAssetInputsRowHandler} disabled={disabled} className={styles.plus_section}>
            <PlusButton className={`${!disabled ? styles.is_active : styles.is_disabled} ${styles.add_button_icon}`} />
          </button>
        )}
      </div>

      <div className={styles.asset_input_form}>
        <span className={styles.input_label}>期間</span>
        <input
          type="text"
          inputMode="numeric"
          className={styles.asset_input_area}
          autoComplete="off"
          placeholder=""
          maxLength={2}
          value={year ? year : ''}
          onKeyDown={(e) => {
            e.code === 'KeyE' && e.preventDefault();
          }}
          onChange={(e) => {
            isNaN(Number(convertZenkakuToHankakuNumber(e.target.value))) && setZenkakuError(true);
            !isNaN(Number(convertZenkakuToHankakuNumber(e.target.value))) &&
              (setYear(Number(convertZenkakuToHankakuNumber(e.target.value))), setZenkakuError(false));
          }}
        />
        <span className={styles.unit_label}>年</span>
      </div>

      <div className={styles.asset_input_form}>
        <span className={styles.input_label}>年利</span>
        {/* これも個別にしても良い */}
        <input
          type="text"
          inputMode="numeric"
          className={styles.asset_input_area}
          autoComplete="off"
          placeholder=""
          maxLength={2}
          value={interestRate ? interestRate : ''}
          onKeyDown={(e) => {
            e.code === 'KeyE' && e.preventDefault();
          }}
          onChange={(e) => {
            isNaN(Number(convertZenkakuToHankakuNumber(e.target.value))) && setZenkakuError(true);
            !isNaN(Number(convertZenkakuToHankakuNumber(e.target.value))) &&
              (setInterestRate(Number(convertZenkakuToHankakuNumber(e.target.value))), setZenkakuError(false));
          }}
        />
        <span className={styles.unit_label}>％</span>
      </div>
      {/* 積立額、一括or個別、年・月 */}
      {zenkakuError && <span className={styles.error_text}>半角数値を入力して下さい</span>}

      <LineChart data={list} />

      <div></div>
      <div></div>
    </>
  );
};

export default CompoundInterest;
