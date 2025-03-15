import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, 'Name must be has 6 characters')
    .max(20, 'Name must be shorter than 20 characters')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter')
    .required(),
  age: yup.number().positive('Age must be positive number').required(),
  email: yup.string().email('Enter valid email').required(),
  password: yup
    .string()
    .min(6, 'Password must be has 6 characters')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[a-z]/, 'Must contain one lowercase letter')
    .matches(/\d/, 'Must contain one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain one special character')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required(),
  gender: yup.string().required(),
  terms: yup.boolean().oneOf([true], 'You must accept terms and conditions'),
});

type FormData = yup.InferType<typeof schema>;

export default function ComponentRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert('Successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} />
        {errors.name && <p className="errorString">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <p className="errorString">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p className="errorString">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && (
          <p className="errorString">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="errorString">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label>Gender:</label>
        <select {...register('gender')}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="errorString">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <input id="terms" type="checkbox" {...register('terms')} />
        <label htmlFor="terms">Accept Terms and Conditions</label>
        {errors.terms && <p className="errorString">{errors.terms.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
