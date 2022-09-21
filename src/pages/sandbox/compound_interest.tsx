import { SetStateAction, useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';

import LineChart from '@components/line_chart/LineChart';
import MinusButton from 'public/images/icons/calc_minus_button.svg';
import PlusButton from 'public/images/icons/calc_plus_button.svg';
import { colorTheme } from 'src/recoil/atoms/colorTheme';
import styles from 'src/styles/sandbox/compound_interest.module.scss';
import { convertZenkakuToHankaku } from 'src/utils/convertZenkakuToHankaku';

type InterestListType = {
  principal: number;
  percentage: number;
  year: number;
}[];

type AssetDataType = {
  [id: string]: {
    capital: number | string;
  };
};

const CompoundInterest: NextPage = ({}) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);
  const originalDarkMode = isDarkMode;
  // const initialArray = [{ principal: 0, percentage: 0, year: 0 }];
  // const [interestArray, setInterestArray] = useState<InterestListType>(initialArray);
  const [year, setYear] = useState(20);
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
    console.log('assetData', assetData);
    const allDataFilled = Object.keys(assetData).every((id) => assetData[id].capital !== (0 || ''));
    if (allDataFilled) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [assetData]);

  const assetFormInputHandler = (
    which: 'capital',
    id: string,
    value: string,
    setAssetData: (value: SetStateAction<AssetDataType>) => void,
    assetData: AssetDataType,
  ) => {
    if (value !== '0' && which === 'capital') {
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
  const array: string[][] = [['Year', '資産']];
  Object.values(assetData).map((data, index) => {
    array.push([String(currentYear + index), data.capital as string]);
  });

  console.log('d', array);

  // const data = [
  //   ['Year', 'Sales', 'Expenses'],
  //   [currentYear, 1000, 400],
  //   ['2005', 1170, 460],
  //   ['2006', 660, 1120],
  //   ['2007', 1030, 540],
  // ];

  return (
    <>
      <div className={styles.calc_section}>
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
                value={capital ? capital : ''}
                onKeyDown={(e) => {
                  e.code === 'KeyE' && e.preventDefault();
                }}
                onChange={(e) => {
                  isNaN(Number(convertZenkakuToHankaku(e.target.value))) && setZenkakuError(true);
                  !isNaN(Number(convertZenkakuToHankaku(e.target.value))) &&
                    (assetFormInputHandler('capital', id, convertZenkakuToHankaku(e.target.value), setAssetData, assetData), setZenkakuError(false));
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

        {Object.keys(assetData).length < 10 && (
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
          maxLength={3}
          value={year ? year : ''}
          onKeyDown={(e) => {
            e.code === 'KeyE' && e.preventDefault();
          }}
          onChange={(e) => {
            isNaN(Number(convertZenkakuToHankaku(e.target.value))) && setZenkakuError(true);
            !isNaN(Number(convertZenkakuToHankaku(e.target.value))) && (setYear(Number(convertZenkakuToHankaku(e.target.value))), setZenkakuError(false));
          }}
        />
        <span className={styles.unit_label}>年</span>
      </div>
      {zenkakuError && <span className={styles.error_text}>半角数値を入力して下さい</span>}

      <LineChart data={array} />

      <div></div>
      <div></div>
    </>
  );
};

export default CompoundInterest;
