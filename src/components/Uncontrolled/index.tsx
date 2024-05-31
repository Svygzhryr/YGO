import {
  MouseEventHandler,
  ChangeEventHandler,
  useRef,
  FormEventHandler,
  FormEvent,
  LegacyRef,
} from 'react';

import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { uncontrolledFormSlice } from '../../redux/reducers/uncontrolledSlice';
import {
  uncontrolledCountrySearch,
  uncontrolledErrors,
  uncontrolledFilteredCountries,
  uncontrolledIsSuggestions,
} from '../../redux/selectors';
import { schema } from '../../utils/validationSchema';
import { notificationSlice } from '../../redux/reducers/notificationSlice';
import { convertBase64 } from '../../utils/utils';

import styles from './Uncontrolled.module.scss';
export interface IFormRef {
  current: (HTMLInputElement | HTMLSelectElement)[];
}

export const Uncontrolled = () => {
  const formRef = useRef<HTMLFormElement | []>([]);
  const setRef = (item: HTMLElement) => {
    if (item && !formRef.current?.includes(item)) {
      formRef.current?.push(item);
    }
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setSearch, filterCountries, setSuggestions, setBase64, setData, setErrors } =
    uncontrolledFormSlice.actions;
  const { setIsActive } = notificationSlice.actions;
  const searchValue = useAppSelector(uncontrolledCountrySearch);
  const filteredCountries = useAppSelector(uncontrolledFilteredCountries);
  const isSuggestionsVisible = useAppSelector(uncontrolledIsSuggestions);
  const errorsState = useAppSelector(uncontrolledErrors);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();

    const name = formRef.current[0] as HTMLInputElement;
    const email = formRef.current[1] as HTMLInputElement;
    const password = formRef.current[2] as HTMLInputElement;
    const confirmPassword = formRef.current[3] as HTMLInputElement;
    const age = formRef.current[4] as HTMLInputElement;
    const gender = formRef.current[5] as HTMLInputElement;
    const file = formRef.current[6] as HTMLInputElement;
    const country = formRef.current[7] as HTMLInputElement;
    const terms = formRef.current[8] as HTMLInputElement;

    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      age: age.value,
      gender: gender.value,
      file: file.files,
      country: country.value,
      terms: terms.checked,
    };

    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      file: '',
      country: '',
      terms: '',
    };

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        dispatch(setData(formData));
        navigate('/');
        dispatch(setIsActive(true));
        setTimeout(() => {
          dispatch(setIsActive(false));
        }, 2000);
      })
      .catch((err) => {
        err.inner.forEach((e: { path: string; message: string }) => {
          errors[e.path as keyof typeof errors] = e.message;
        });
        dispatch(setErrors(errors));
      });
  };

  const handleCountryClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLElement;
    const value = target.innerHTML;
    dispatch(setSearch(value));
  };

  const handleCountryFocus = () => {
    dispatch(setSuggestions(true));
  };

  const handleCountryBlur = () => {
    setTimeout(() => {
      dispatch(setSuggestions(false));
    }, 100);
  };

  const handleCountryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    dispatch(filterCountries(value));
    dispatch(setSearch(value));
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const target = e.target as HTMLInputElement;
    let value;
    if (target.files) {
      value = target.files[0];
    } else {
      console.error('Cant upload an image...');
      return;
    }
    const convertedImage = (await convertBase64(value)) as string;
    dispatch(setBase64(convertedImage));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Bring your soul back!</h1>
      <h6>is this even possible?</h6>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <input
              className={errorsState?.name && styles.invalid}
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              name="name"
              type="text"
              placeholder="Your name here.."
            />
            <div className={styles.errorText}>{errorsState?.name}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errorsState?.email && styles.invalid}
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              name="email"
              type="text"
              autoComplete="username"
              placeholder="Email here.."
            />
            <div className={styles.errorText}>{errorsState?.email}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              className={errorsState?.password && styles.invalid}
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password, for some reason"
            />
            <div className={styles.errorText}>{errorsState?.password}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              className={errorsState?.confirmPassword && styles.invalid}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password.."
            />
            <div className={styles.errorText}>{errorsState?.confirmPassword}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              className={errorsState?.age && styles.invalid}
              name="age"
              type="text"
              placeholder="Age, if you please"
            />
            <div className={styles.errorText}>{errorsState?.age}</div>
          </div>
          <div className={styles.inputWrapper}>
            <select
              ref={setRef as LegacyRef<HTMLSelectElement> | undefined}
              name="gender"
              placeholder="Your gender.."
            >
              <option value="default" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="dwarf">Dwarf</option>
              <option value="undead">Undead</option>
              <option value="attackHelicopter">Attack helicopter</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="file-upload"
              name="file"
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              className={`${styles.file} ${errorsState?.file && styles.invalid}`}
              type="file"
              placeholder="Your photo, please"
              onChange={handleFileChange}
            />
            <div className={styles.errorText}>{errorsState?.file}</div>
          </div>
          <div className={styles.autocompleteInputWrapper}>
            <input
              ref={setRef as LegacyRef<HTMLInputElement> | undefined}
              value={searchValue}
              name="country"
              type="text"
              placeholder="Finally, your country"
              className={clsx({ [styles.invalid]: !!errorsState.country })}
              onChange={handleCountryChange}
              onFocus={handleCountryFocus}
              onBlur={handleCountryBlur}
            />
            {isSuggestionsVisible && (
              <ul className={styles.countries}>
                {filteredCountries.map((item: string) => (
                  <li onClick={handleCountryClick} className={styles.countriesItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.errorText}>{errorsState?.country}</div>
          </div>
        </div>
        <label className={styles.checkboxWrapper}>
          <input
            ref={setRef as LegacyRef<HTMLInputElement> | undefined}
            name="terms"
            className={styles.checkbox}
            type="checkbox"
          />
          <p>
            I understand that there is no way I can get my soul back and an oath I&apos;ve made
            cannot be broken
          </p>
        </label>
        <div className={styles.errorText}>{errorsState?.terms}</div>
        <button className={styles.submitButton} type="submit">
          Become &quot;free&quot; of your bond
        </button>
      </form>
    </div>
  );
};
