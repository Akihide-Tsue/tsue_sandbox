import { SetStateAction, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('@components/line_chart/LineChart'), { ssr: false });

import type { NextPage } from 'next';

import { v4 as uuid } from 'uuid';

import SandboxBreadCrumb from '@components/sandbox_bread_crumb/SandboxBreadCrumb';
import MinusButton from 'public/images/icons/calc_minus_button.svg';
import PlusButton from 'public/images/icons/calc_plus_button.svg';
import styles from 'src/styles/sandbox/compound_interest.module.scss';
import { convertZenkakuToHankakuNumber } from 'src/utils/convertZenkakuToHankaku';

type AssetDataType = {
  [id: string]: {
    capital: number | string;
  };
};

const CompoundInterest: NextPage = ({}) => {
  const [year, setYear] = useState(30);
  const [interestRate, setInterestRate] = useState<string | number>(5);
  const [accumulationPrice, setAccumulationPrice] = useState<string | number>(0);
  const [annualAccumulationPrice, setAnnualAccumulationPrice] = useState<number>(0);
  const [zenkakuError, setZenkakuError] = useState(false);
  const [accumulation, setAccumulation] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [assetData, setAssetData] = useState<AssetDataType>({
    [uuid()]: {
      capital: 100,
    },
    [uuid()]: {
      capital: 200,
    },
    [uuid()]: {
      capital: 300,
    },
  });
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
      setAssetData({ ...assetData, [id]: { ...assetData[id], capital: value } });
    }
  };

  const addAssetInputsRowHandler = () => {
    setAssetData({
      ...assetData,
      [uuid()]: {
        capital: 100 * (Object.keys(assetData).length + 1),
      },
    });
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

  const interestPercent = Number(interestRate) * 0.01;
  //年数が表示ライン数より少ないと描画されないため
  const minLoop = year < Object.values(assetData).length ? Object.values(assetData).length : year;

  Object.values(assetData).map((data, index) => {
    for (let i = 0; i < minLoop; i++) {
      if (index === 0) {
        list.push({
          year: currentYear + i,
          [`資産${index + 1}`]:
            Math.round(
              (Number(data.capital) * (1 + interestPercent) ** i + (Number(annualAccumulationPrice) * ((1 + interestPercent) ** i - 1)) / interestPercent) *
                100,
            ) * 0.01,
        });
      } else {
        //資産2以降の処理は追加のみ
        list[i][`資産${index + 1}`] =
          Math.round(
            (Number(data.capital) * (1 + interestPercent) ** i + (Number(annualAccumulationPrice) * ((1 + interestPercent) ** i - 1)) / interestPercent) * 100,
          ) * 0.01;
      }
    }
  });

  useEffect(() => {
    if (accumulation === 'month') {
      setAccumulationPrice(10);
    } else if (accumulation === 'year') {
      setAccumulationPrice(120);
    } else {
      setAccumulationPrice(0);
      setAnnualAccumulationPrice(0);
    }
  }, [accumulation]);

  useEffect(() => {
    if (accumulation === 'month') {
      setAnnualAccumulationPrice(Number(accumulationPrice) * 12);
    } else if (accumulation === 'year') {
      setAnnualAccumulationPrice(Number(accumulationPrice));
    }
  }, [accumulationPrice]);

  return (
    <>
      <SandboxBreadCrumb currentTitle="複利計算チャート" />

      <div className={styles.calc_section}>
        <div className={styles.info_input_wrapper}>
          <div className={styles.asset_input_form}>
            <span className={styles.input_label}>期間</span>
            <input
              type="text"
              inputMode="numeric"
              className={styles.info_input}
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
            <span className={styles.info_input_label}>年利</span>
            <input
              type="text"
              inputMode="numeric"
              className={styles.info_input}
              autoComplete="off"
              placeholder=""
              maxLength={4}
              value={interestRate ? interestRate : ''}
              onKeyDown={(e) => {
                e.code === 'KeyE' && e.preventDefault();
              }}
              onChange={(e) => {
                setInterestRate(convertZenkakuToHankakuNumber(e.target.value)), setZenkakuError(false);
              }}
            />
            <span className={styles.unit_label}>％</span>
          </div>
        </div>

        <div className={styles.accumulation_wrapper}>
          <div className={styles.asset_input_form}>
            <span className={styles.input_label}>積立設定</span>
            <div className={styles.radio_area}>
              <input
                id="radio1"
                className={styles.radio_button}
                onClick={() => {
                  setAccumulation('');
                }}
                name="name"
                type="radio"
                checked={accumulation === ''}
              />
              <label htmlFor="radio1" className={styles.label}>
                なし
              </label>
              <input
                id="radio2"
                className={styles.radio_button}
                onClick={() => {
                  setAccumulation('month');
                }}
                name="name"
                type="radio"
                checked={accumulation === 'month'}
              />
              <label htmlFor="radio2" className={styles.label}>
                月間
              </label>
              <input
                id="radio3"
                className={styles.radio_button}
                onClick={() => {
                  setAccumulation('year');
                }}
                name="name"
                type="radio"
                checked={accumulation === 'year'}
              />
              <label htmlFor="radio3" className={styles.label}>
                年間
              </label>
            </div>
          </div>

          {accumulation && (
            <div className={styles.asset_input_form}>
              <span className={styles.input_label}>積立額</span>
              <input
                type="text"
                inputMode="numeric"
                className={styles.asset_input_area}
                autoComplete="off"
                placeholder=""
                maxLength={4}
                value={accumulationPrice ? accumulationPrice : ''}
                onKeyDown={(e) => {
                  e.code === 'KeyE' && e.preventDefault();
                }}
                onChange={(e) => {
                  setAccumulationPrice(convertZenkakuToHankakuNumber(e.target.value)), setZenkakuError(false);
                }}
              />
              <span className={styles.unit_label}>万円</span>
            </div>
          )}
        </div>

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
                    (assetFormInputHandler('capital', id, Number(convertZenkakuToHankakuNumber(e.target.value)), setAssetData, assetData),
                    setZenkakuError(false));
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

      {/* 積立額、一括or個別、年・月 */}
      {zenkakuError && <span className={styles.error_text}>半角数値を入力して下さい</span>}

      <LineChart data={list} />

      <div className={styles.method_text}>
        複利計算式
        <br />
        Math.round((原元 * (1 + 利率) ** 経過年 + (年間積立額 * ((1 + 利率) ** 経過年 - 1)) / 利率))
      </div>
    </>
  );
};

export default CompoundInterest;
