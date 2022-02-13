import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const AddStudent = () => {
	const [name, setName] = useState('');
	const [course, setCourse] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const [errList, setErrList] = useState({});

	const saveStudent = async (e) => {
		e.preventDefault();

		const res = await axios.post('http://127.0.0.1:8000/api/add-student', {
			name,
			course,
			email,
			phone
		})

		if (res.data.status === 200) {
			console.log(res.data.message);
			setName('');
			setCourse('');
			setEmail('');
			setPhone('');

			swal({
				title: "Added",
				text: res.data.message,
				icon: "success",
				button: "OK",
			});
		}
		else {
			console.log(res.data.validate_err);
			setErrList(res.data.validate_err);
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-header">
							<h4>
								Add Students
								<Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
							</h4>
						</div>

						<div className="card-body">
							<form onSubmit={(e) => saveStudent(e)}>
								<div className="form-group mb-3">
									<label>Student Name</label>
									<input
										type="text"
										className="form-control"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<span className="text-danger">{errList.name}</span>
								</div>
								<div className="form-group mb-3">
									<label>Student Course</label>
									<input
										type="text"
										className="form-control"
										name="course"
										value={course}
										onChange={(e) => setCourse(e.target.value)}
									/>
									<span className="text-danger">{errList.course}</span>
								</div>
								<div className="form-group mb-3">
									<label>Student Email</label>
									<input
										type="text"
										className="form-control"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<span className="text-danger">{errList.email}</span>
								</div>
								<div className="form-group mb-3">
									<label>Student Phone</label>
									<input
										type="text"
										className="form-control"
										name="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
									<span className="text-danger">{errList.phone}</span>
								</div>
								<div className="form-group mb-3">
									<button type="submit" className="btn btn-primary">Save Student</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddStudent;