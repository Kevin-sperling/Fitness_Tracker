import { useState, useEffect } from "react";

const API_URL = 'https://fitnesstrac-kr.herokuapp.com/api/routines'

const Routines = ({ token, username }) => {
    const [routines, setRoutines] = useState([]);


    const fetchData = async () => {

        try {
            const response = await fetch(`${API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            const result = await response.json();
            console.log("result", result);
            setRoutines(result)

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const publicRoutines = routines.filter(routine => routine.isPublic === true)

    return (

        <div id='routines'>
            <h1>Routines</h1>
            <div className>
                {
                    publicRoutines.map((routine =>
                        <div className='routineCard' key={routine.id}>
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

                        </div>
                    ))
                }
            </div>

        </div>


    )

}

export default Routines;
