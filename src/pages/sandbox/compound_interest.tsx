import { SetStateAction, useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';

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

const CompaundInterest: NextPage = ({}) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);
  const originalDarkMode = isDarkMode;
  const initialArray = [{ principal: 0, percentage: 0, year: 0 }];
  const [interestArray, setInterestArray] = useState<InterestListType>(initialArray);
  const [disabled, setDisabled] = useState(true);

  const initialAssetData = () => {
    const id = uuid();
    return {
      [id]: {
        capital: 1,
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

  return (
    <>
      <div className={styles.calc_section}>
        {Object.entries(assetData).map(([id, { capital }], index) => {
          return (
            <div className={styles.asset_input_form} key={id}>
              <span className={styles.input_label}>{'資産' + String(index + 1)}</span>
              <input
                type="text"
                // inputMode="decimal"
                inputMode="numeric"
                className={styles.asset_input_area}
                autoComplete="off"
                placeholder=""
                value={capital ? capital : ''}
                onChange={(e) =>
                  // (e: ChangeEvent<HTMLInputElement>) => convertZenkakuToHankaku(e.target.value)
                  // handleLandAreaCalculate.landFormInputHandler('land', id, convertZenkakuToHankaku(e.target.value), setAssetData, assetData)
                  assetFormInputHandler('capital', id, convertZenkakuToHankaku(e.target.value), setAssetData, assetData)
                }
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

        {/* <div> */}
        <button onClick={addAssetInputsRowHandler} disabled={disabled} className={styles.plus_section}>
          <PlusButton className={`${!disabled ? styles.is_active : styles.is_disabled} ${styles.add_button_icon}`} />
        </button>
      </div>
      {/* </div> */}

      <div>
        {interestArray.map((data) => {
          return data.percentage;
        })}
      </div>
      <div></div>
      <div></div>
    </>
  );
};

export default CompaundInterest;
