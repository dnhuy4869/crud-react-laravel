import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const EditStudent = () => {
	const [name, setName] = useState('');
	const [course, setCourse] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const { id } = useParams();

	useEffect(async () => {
		const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${id}`);

		if (res.data.status === 200) {
			setName(res.data.student.name);
			setCourse(res.data.student.course);
			setEmail(res.data.student.email);
			setPhone(res.data.student.phone);
		}
	}, []);

	const updateStudent = async (e) => {
		e.preventDefault();

		document.getElementById('updatebtn').disabled = true;
		document.getElementById('updatebtn').innerText = "Updating...";

		const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${id}`, {
			name,
			course,
			email,
			phone
		})

		if (res.data.status === 200) {
			console.log(res.data.message);

			swal({
				title: "Updated",
				text: res.data.message,
				icon: "success",
				button: "OK",
			});

			document.getElementById('updatebtn').disabled = false;
			document.getElementById('updatebtn').innerText = "Update Student";
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-header">
							<h4>
								Edit Students
								<Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
							</h4>
						</div>

						<div className="card-body">
							<form onSubmit={(e) => updateStudent(e)}>
								<div className="form-group mb-3">
									<label>Student Name</label>
									<input
										type="text"
										className="form-control"
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
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
								</div>
								<div className="form-group mb-3">
									<button type="submit" className="btn btn-primary" id="updatebtn">Update Student</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditStudent;