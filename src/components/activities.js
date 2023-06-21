import React, { useState, useEffect } from 'react';

const API_URL = 'https://fitnesstrac-kr.herokuapp.com/api/activities'

const Activities = ({ token }) => {
    const [activities, setActivities] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [gettingRoutines, setGettingRoutines] = useState(false);
    const [activityId, setActivityId] = useState('')
    const [routines, setRoutines] = useState('')



    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            setActivities(result)

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${name}`,
                    description: `${description}`
                })
            })
            const results = await response.json()
            console.log('results', results);

            fetchData();

            setName('')
            setDescription('')

        } catch (error) {
            console.error(error)
        }
    }


    const getRoutinesbyActivity = async (activityId) => {
        console.log(activityId)
        try {
            const response = await fetch(`${API_URL}/${activityId}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            console.log('results', result);
            setRoutines(result);
            console.log('rounites with this activity', routines);

            setGettingRoutines(true);

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="activity">

            {token ?
                <form className='newActivityForm' onSubmit={handleSubmit}>
                    <h2>Create a New Activity</h2>
                    <input type="text"
                        placeholder="name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                        }} />
                    <input type="text"
                        placeholder="description"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }} />
                    <button type="submit">Add Activity</button>
                </form>
                : ''
            }
            <h1>Activities</h1>
            <div className="activitiesSection">
                {
                    activities.map((activity) =>
                        <div className='activityCard' key={activity.id}>
                            <h3>{activity.name}</h3>
                            <p><b>Description: </b>{activity.description}</p>
                            <button onClick={() => getRoutinesbyActivity(activity.id)}>See all routines with this activity</button>
                        </div>
                    )

                }


            </div>

            {gettingRoutines ?

                routines.map((routine =>
                    <div className='floatingRoutineCard' key={routine.id}>
                        <div className="routineCardTop">
                            <p className='routineTitle'>{routine.name}</p>
                            <p><b>Goal: </b>{routine.goal}</p>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            <p><b>Activities:</b></p>
                        </div>

                        <div >
                            {routine.activities.map((activity) =>
                                <div className="routineCardActivity" key={activity.id}>
                                    <p><b>Activity Name: </b>{activity.name}</p>
                                    <p><b>Description: </b>{activity.description}</p>
                                    <p><b>Duration: </b>{activity.duration}</p>
                                    <p><b>Count: </b>{activity.count}</p>
                                </div>
                            )
                            }
                        </div>

                        <button onClick={() => setGettingRoutines(false)}>Close</button>

                    </div>
                ))



                : ''
            }


        </div>
    )
};

export default Activities;