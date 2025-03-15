import { useRef, useState } from 'react';

export default function ComponentUsusal() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const name = nameRef.current?.value.trim();
    const age = ageRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const confirmPassword = confirmPasswordRef.current?.value.trim();
    const termsChecked = termsRef.current?.checked;

    if (!name || !/^[A-Z][a-z]*$/.test(name)) {
      newErrors.name = 'Name should start with an uppercase letter';
    }

    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = 'Age must be positive number';
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter valid email';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be has 6 characters';
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      newErrors.password =
        'Password must contain uppercase, lowercase, number, and special character';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsChecked) {
      newErrors.terms = 'You must accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        name: nameRef.current?.value,
        age: Number(ageRef.current?.value),
        email: emailRef.current?.value,
        gender: genderRef.current?.value,
        termsAccepted: termsRef.current?.checked,
      };
      console.log(data);
      alert('Successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" ref={nameRef} />
        {errors.name && <p className="errorString">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" ref={ageRef} />
        {errors.age && <p className="errorString">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref={emailRef} />
        {errors.email && <p className="errorString">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={passwordRef} />
        {errors.password && <p className="errorString">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
        {errors.confirmPassword && (
          <p className="errorString">{errors.confirmPassword}</p>
        )}
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
        {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
