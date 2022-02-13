import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Student = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		const res = await axios.get('http://127.0.0.1:8000/api/students');

		if (res.data.status === 200) {
			setStudents(res.data.students);
			setLoading(false);
		}
	}, []);

	const deleteStudent = async (e, id) => {
		const current = e.currentTarget;
		current.disabled = true;
		current.innerText = 'Deleting...';

		const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);

		if (res.data.status === 200) {
			console.log(res.data.message);

			current.closest('tr').remove();

			swal({
				title: "Deleted",
				text: res.data.message,
				icon: "success",
				button: "OK",
			});
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-header">
							<h4>
								Students Data
								<Link to={'add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
							</h4>
						</div>

						<div className="card-body">
							<table className="table table-bordered table-striped">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Course</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>

								<tbody>
									{
										loading
											? <tr><td colSpan="7"><h2>Loading...</h2></td></tr>
											: students.map((student, index) => {
												return (
													<tr key={index}>
														<td>{student.id}</td>
														<td>{student.name}</td>
														<td>{student.course}</td>
														<td>{student.email}</td>
														<td>{student.phone}</td>
														<td>
															<Link to={`/edit-student/${student.id}`} className="btn btn-success btn-sm">Edit</Link>
														</td>
														<td>
															<button
																type="button"
																className="btn btn-danger btn-sm"
																onClick={(e) => deleteStudent(e, student.id)}
															>
																Delete
															</button>
														</td>
													</tr>
												)
											})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Student;