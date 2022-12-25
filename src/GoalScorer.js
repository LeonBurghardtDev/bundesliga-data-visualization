import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GoalScorer(props) {
    const { selectedSeason } = props;
    const [goalScorers, setGoalScorers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://www.openligadb.de/api/getgoalgetters/bl1/${selectedSeason}`
            );
            setGoalScorers(response.data);
        }
        fetchData();
    }, [selectedSeason]);

    return (
        <>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h1>
                    Topscorer {selectedSeason}/{selectedSeason + 1}
                </h1>
            </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Goals</th>
                    </tr>
                    </thead>
                    <tbody>
                    {goalScorers
                        .sort((a, b) => b.GoalCount - a.GoalCount)
                        .slice(0, 20)
                        .map((goalScorer, index) => (

                        <tr key={goalScorer.GoalGetterID}>
                            <td>{index + 1}</td>
                            <td>{goalScorer.GoalGetterName}</td>
                            <td>{goalScorer.GoalCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );


}

export default GoalScorer;
