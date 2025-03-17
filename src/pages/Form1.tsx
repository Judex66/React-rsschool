import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFormData } from '../redux/formData';
import * as yup from 'yup';
export default function ComponentUsusal() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
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
    picture: yup
      .mixed<FileList>()
      .required()
      .test(
        'fileSize',
        'File too large, it should be less than 2MB',
        (value) => {
          if (value) {
            return value[0].size <= 2 * 1024 * 1240;
          } else {
            return true;
          }
        }
      )
      .test(
        'fileFormat',
        'Unsupported format, only JPEG and PNG are allowed',
        (value) => {
          if (value) {
            return ['image/png', 'image/jpeg'].includes(value[0].type);
          }
        }
      ),
  });

  const handleFileUpload = (file: File) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = (event: React.FormEvent) => {
    if (validate()) {
      const base64String = await handleFileUpload(imgRef.current?.value);
      const data = {
        name: nameRef.current?.value,
        age: Number(ageRef.current?.value),
        email: emailRef.current?.value,
        gender: genderRef.current?.value,
        termsAccepted: termsRef.current?.checked,
        image: imgRef.current?.value,
      };
      dispatch(addFormData(data));
      alert('Successfully!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" ref={nameRef} />
          <p className="errorString">{errors?.name}</p>
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" ref={ageRef} />
          <p className="errorString">{errors?.age}</p>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" ref={emailRef} />
          <p className="errorString">{errors?.email}</p>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" ref={passwordRef} />
          <p className="errorString">{errors?.password}</p>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
          />

          <p className="errorString">{errors?.confirmPassword}</p>
        </div>

        <div>
          <label>Gender:</label>
          <select ref={genderRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <input id="terms" type="checkbox" ref={termsRef} />
          <label htmlFor="terms">Accept Terms and Conditions</label>
          <p className="errorString">{errors?.terms}</p>
        </div>

        <div>
          <input type="file" ref={imgRef} />
          <p className="errorString">{errors?.img}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
      <Link to="/">Back</Link>
    </>
  );
}
