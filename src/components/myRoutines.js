import { useState, useEffect } from "react";

const API_URL = 'https://fitnesstrac-kr.herokuapp.com/api'

const MyRoutines = ({ token, username }) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [activities, setActivities] = useState([]);


    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(true)

    const [updatingRoutine, setUpdatingRoutine] = useState(false)
    const [updatingRoutineActivity, setUpdatingRoutineActivity] = useState(false)

    const [routineId, setRoutineId] = useState('')
    const [routineActivityId, setRoutineActivityId] = useState('')

    const [duration, setDuration] = useState('')
    const [count, setCount] = useState('')
    const [activityId, setActivityId] = useState('')



    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();

            console.log(result);

            setMyRoutines(result)

        } catch (err) {
            console.error(err);
        }

    };

    const handleNewRoutineSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`${API_URL}/routines`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${name}`,
                    goal: `${goal}`,
                    isPublic: `${isPublic}`
                })
            })
            const result = await response.json()
            console.log('new routine result', result);

            setName('')
            setGoal('')
            setIsPublic(true)

            fetchData();

        } catch (error) {
            console.error(error)
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/routines/${routineId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${name}`,
                    goal: `${goal}`,
                    isPublic: `${isPublic}`
                })
            })
            const result = await response.json()
            console.log('patch routine result', result);

            setName('');
            setGoal('');
            setIsPublic(true);

            setUpdatingRoutine(false);

            fetchData();


        } catch (error) {
            console.error(error)
        }
    };

    const editRoutine = (routineId) => {
        setUpdatingRoutine(true);
        setRoutineId(routineId);

    };

    const handleRoutineDelete = async () => {

        try {
            const response = await fetch(`${API_URL}/routines/${routineId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            console.log('delete reoutine restuls:', result);

            setRoutineId('')

            fetchData();



        } catch (error) {
            console.error(error)
        }
    };

    const deleteRoutine = (routineId) => {
        setRoutineId(routineId);
        console.log(routineId);
        handleRoutineDelete();

    };

    const fetchActivities = async () => {
        try {
            const response = await fetch(`${API_URL}/activities`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            setActivities(result)

        } catch (err) {
            console.error(err);
        }
    };

    const handleAddActivitySubmit = async (routineId) => {

        console.log('activityId, count, duration, routineId', activityId, count, duration, routineId);
        try {
            const response = await fetch(`${API_URL}/routines/${routineId}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    activityId: `${activityId}`,
                    count: `${count}`,
                    duration: `${duration}`
                })
            });

            const result = await response.json();
            console.log("add activity", result);

            setRoutineId('');
            setActivityId('');
            setDuration('');
            setCount('');

            fetchData();
        } catch (err) {
            console.error(err);
        }

    };

    const editRoutineActivity = (routineActivityId) => {
        setUpdatingRoutineActivity(true);
        setRoutineActivityId(routineActivityId);

    };

    const handleUpdateRoutineActivity = async () => {

        console.log('routineActivityId, count, duration', routineActivityId, count, duration);
        try {
            const response = await fetch(`${API_URL}/routine_activities/${routineActivityId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    count: `${count}`,
                    duration: `${duration}`
                })
            });
            const result = await response.json();
            console.log('patch routine activity results:', result);

            setDuration('');
            setCount('');
            setUpdatingRoutineActivity(false);

            fetchData();


        } catch (err) {
            console.error(err);
        }
    }

    const handleRoutineActivityDelete = async (routineActivityId) => {
        try {
            const response = await fetch(`${API_URL}/routine_activities/${routineActivityId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            console.log('delete routine activity results:', result);

            fetchData();

        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchData();
        fetchActivities();
    }, [])




    return (

        <div className="myRoutines">

            <form className='myRoutineForm' onSubmit={handleNewRoutineSubmit}>
                <h2>Create a New Routine</h2>

                <label>Name</label>
                <input type="text"
                    placeholder="name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }} />

                <label>Goal</label>
                <input type="text"
                    placeholder="goal"
                    value={goal}
                    onChange={(event) => {
                        setGoal(event.target.value)
                    }} />

                <label>Is Public?</label>
                <select value={isPublic}
                    onChange={(event) => { setIsPublic(event.target.value) }}
                    name="isPublic">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

                <button>Add Routine</button>
            </form>
            <h1 className="myRoutinesTitle"> {username}'s Routines</h1>
            <div >
                {
                    myRoutines.map((routine) =>
                        <div className="routineCard" key={routine.id}>
                            <div className="routineCardTop">
                                <p className='routineTitle'>{routine.name}</p>
                                <p><b>Goal: </b>{routine.goal}</p>
                                <button type='button' onClick={() => editRoutine(routine.id)} >Edit</button>
                                <button type='button' onClick={() => deleteRoutine(routine.id)} >Delete</button>
                                <p>Activities:</p>
                            </div>



                            {routine.activities ?
                                <div>

                                    {routine.activities.map((activity) =>
                                        <div className='routineCardActivity' key={activity.id}>
                                            <p><b>Name: </b>{activity.name}</p>
                                            <p><b>Description: </b>{activity.description}</p>
                                            <p><b>Duration: </b>{activity.duration}</p>
                                            <p><b>Count: </b>{activity.count}</p>

                                            <button type='button' onClick={() => editRoutineActivity(activity.routineActivityId)} >Edit</button>


                                            <button type='button' onClick={() => handleRoutineActivityDelete(activity.routineActivityId)} >Delete</button>


                                        </div>
                                    )
                                    }
                                </div>
                                : ''
                            }

                            {updatingRoutineActivity ?
                                <div className='updateRoutineForm'>
                                    <div> Update your Routine Activity </div>
                                    <input type="text"
                                        placeholder="Duration"
                                        value={duration}
                                        onChange={(event) => {
                                            setDuration(event.target.value)
                                        }} />


                                    <input type="number"
                                        placeholder="Count"
                                        value={count}
                                        onChange={(event) => {
                                            setCount(event.target.value)
                                        }} />


                                    <button onClick={() => handleUpdateRoutineActivity()}>Update Activity</button>
                                </div>

                                : ''
                            }



                            <div className="addActivities">
                                <div className="test">

                                    <div>Add activity to this routine</div>

                                    <div name="activities" id="activities" >

                                        <select name="activities" id="activities" onChange={(event) => {

                                            setActivityId(event.target.value)
                                        }}>
                                            <option value="">Select an Activity</option>
                                            {activities.map((activity) => (
                                                <option key={activity.id}
                                                    value={activity.id}>
                                                    {activity.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <input type="text"
                                        placeholder="Duration"
                                        value={duration}
                                        onChange={(event) => {
                                            setDuration(event.target.value)
                                        }} />


                                    <input type="number"
                                        placeholder="Count"
                                        value={count}
                                        onChange={(event) => {
                                            setCount(event.target.value)
                                        }} />


                                    <button onClick={() => handleAddActivitySubmit(routine.id)}>Add Activity</button>

                                </div>



                            </div>
                        </div>
                    )
                }


                {updatingRoutine ?



                    <form className='updateRoutineForm' onSubmit={handleEditSubmit}>
                        <h2>Update a Routine</h2>

                        <label>Name</label>
                        <input type="text"
                            placeholder="name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }} />

                        <label>Goal</label>
                        <input type="text"
                            placeholder="goal"
                            value={goal}
                            onChange={(event) => {
                                setGoal(event.target.value)
                            }} />

                        <label>Is Public?</label>

                        <select value={isPublic}
                            onChange={(event) => { setIsPublic(event.target.value) }}
                            name="isPublic">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>

                        <button>Update Routine</button>
                    </form>

                    : ''

                }
            </div>

        </div>


    )




}


export default MyRoutines;