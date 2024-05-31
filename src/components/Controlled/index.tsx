import { MouseEventHandler, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { controlledFormSlice } from '../../redux/reducers/controlledSlice';
import { controlledCountrySearch, controlledFilteredCountries } from '../../redux/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { notificationSlice } from '../../redux/reducers/notificationSlice';
import { schema } from '../../utils/validationSchema';
import { convertBase64 } from '../../utils/utils';

import styles from './Controlled.module.scss';
import { IFormProps } from '../../utils/types';
import clsx from 'clsx';

export const Controlled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const isInvalid = !!Object.entries(errors).length;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setSearch, filterCountries, setBase64, setData } = controlledFormSlice.actions;
  const { setIsActive } = notificationSlice.actions;
  const searchValue = useAppSelector(controlledCountrySearch);
  const filteredCountries = useAppSelector(controlledFilteredCountries);

  const onSubmitHandler = (formData: IFormProps) => {
    if (formData.file) {
      convertBase64(formData.file[0]).then((base64) => {
        dispatch(setBase64(base64));
      });
    } else {
      console.error('Cant upload image..');
    }

    const { age, confirmPassword, country, email, gender, name, password, terms } = formData;

    dispatch(setData({ name, email, password, confirmPassword, age, country, gender, terms }));
    navigate('/');
    dispatch(setIsActive(true));
    setTimeout(() => {
      dispatch(setIsActive(false));
    }, 2000);
  };

  const handleCountryClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLElement;
    const value = target.innerHTML;
    dispatch(setSearch(value));
    setValue('country', value);
  };

  useEffect(() => {
    watch(({ country }) => {
      dispatch(setSearch(country));
      dispatch(filterCountries(country));
    });
  }, [watch, dispatch, filterCountries, setSearch]);

  return (
    <div className={styles.wrapper}>
      <h1>Forfeit your soul!</h1>
      <h6>not that you need it anyway</h6>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <input
              className={errors.name && styles.invalid}
              {...register('name')}
              name="name"
              type="text"
              placeholder="Your name here.."
            />
            <div className={styles.errorText}>{errors.name?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.email && styles.invalid}
              {...register('email')}
              name="email"
              type="text"
              autoComplete="username"
              placeholder="Email here.."
            />
            <div className={styles.errorText}>{errors.email?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.password && styles.invalid}
              {...register('password')}
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password, for some reason"
            />
            <div className={styles.errorText}>{errors.password?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.confirmPassword && styles.invalid}
              {...register('confirmPassword')}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password.."
            />
            <div className={styles.errorText}>{errors.confirmPassword?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.age && styles.invalid}
              {...register('age')}
              name="age"
              type="text"
              placeholder="Age, if you please"
            />
            <div className={styles.errorText}>{errors.age?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <select {...register('gender')} name="gender" placeholder="Your gender..">
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
              {...register('file')}
              name="file"
              className={`${styles.file} ${errors.file && styles.invalid}`}
              type="file"
              placeholder="Your photo, please"
            />
            <div className={styles.errorText}>{errors.file?.message}</div>
          </div>
          <div className={styles.autocompleteInputWrapper}>
            <input
              {...register('country')}
              name="country"
              type="text"
              placeholder="Finally, your country"
              className={clsx(errors.country && styles.invalid)}
            />
            {searchValue && (
              <ul className={styles.countries}>
                {filteredCountries.map(
                  (item: string) =>
                    item === searchValue || (
                      <li onClick={handleCountryClick} className={styles.countriesItem} key={item}>
                        {item}
                      </li>
                    )
                )}
              </ul>
            )}
            <div className={styles.errorText}>{errors.country?.message}</div>
          </div>
        </div>
        <label className={styles.checkboxWrapper}>
          <input {...register('terms')} name="terms" className={styles.checkbox} type="checkbox" />
          <p>
            I acknowledge that my soul will be taken away in exchange for infinite wealth,
            knowledge, immortality, etc. whatever
          </p>
        </label>
        <div className={styles.errorText}>{errors.terms?.message}</div>
        <button disabled={isInvalid} className={styles.submitButton} type="submit">
          {isInvalid ? 'Fill out this form first, dear' : 'Become a senior developer'}
        </button>
      </form>
    </div>
  );
};
