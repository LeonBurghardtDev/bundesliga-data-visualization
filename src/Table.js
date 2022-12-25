import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table(props) {
    const minSeason = 2010;
    const [selectedSeason, setSelectedSeason] = useState(2022);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://www.openligadb.de/api/getbltable/bl1/${selectedSeason}`
            );
            setTableData(response.data);
            props.onSeasonChange(selectedSeason, response.data);
        }

        fetchData();
    }, [selectedSeason]);

    function handleSeasonChange(event) {
        setSelectedSeason(event.target.value);
    }

    async function handleIncrement() {
        // Only allow increment if selected season is not the current season
        if (selectedSeason + 1 <= new Date().getFullYear()) {
            setSelectedSeason(selectedSeason + 1);
            const response = await axios.get(
                `https://www.openligadb.de/api/getbltable/bl1/${selectedSeason + 1}`
            );
            props.onSeasonChange(selectedSeason + 1, response.data);
        }
    }

    async function handleDecrement() {
        // Only allow decrement if selected season is greater than the minimum season
        if (selectedSeason-1 > minSeason) {
            setSelectedSeason(selectedSeason - 1);
            const response = await axios.get(
                `https://www.openligadb.de/api/getbltable/bl1/${selectedSeason - 1}`
            );
            props.onSeasonChange(selectedSeason - 1, response.data);
        }
    }

    const currentYear = new Date().getFullYear();

    let options = [];
    for (let year = currentYear; year > minSeason; year--) {
        options.push(<option value={year}>{year}/{year+1}</option>);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center"}}>
                <h1>Bundesliga Table Season {selectedSeason}/{selectedSeason+1}</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center"}}>
                <button type="button" onClick={handleDecrement.bind(this)}>
                    {"<"}
                </button>
                <label>
                    Select season:
                    <select value={selectedSeason} onChange={handleSeasonChange}>
                        {options}
                    </select>
                </label>
                <button type="button" onClick={handleIncrement.bind(this)}>
                    {">"}
                </button>
            </div>

            <table style={{ margin: "auto" }}>
                <thead>
                <tr>
                    <th>Place</th>
                    <th>Team</th>
                    <th>Points</th>
                    <th>Wins</th>
                    <th>Draws</th>
                    <th>Losses</th>
                    <th>Games</th>
                    <th>Goals</th>
                    <th>Conceded</th>
                    <th>Goal Difference</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((team,index) => (
                    // write js code here

                    <tr key={team.TeamId}>
                        <td>{index + 1+"."}</td>
                        <td><img src={team.TeamIconUrl}  style={{ height: "20px", width: "20px" }}></img>{" "+team.ShortName}</td>
                        <td>{team.Points}</td>
                        <td>{team.Won}</td>
                        <td>{team.Draw}</td>
                        <td>{team.Lost}</td>
                        <td>{team.Won+team.Draw+team.Lost}</td>
                        <td>{team.Goals}</td>
                        <td>{team.OpponentGoals}</td>
                        <td>{team.Goals-team.OpponentGoals}</td>
                    </tr>
                ))}
                </tbody>
            </table>


        </>
    );
}
export default Table;