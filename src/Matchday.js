import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Matchday(props) {
    const { selectedSeason } = props;
    const [selectedMatchday, setSelectedMatchday] = useState();
    const [matchdayData, setMatchdayData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://www.openligadb.de/api/getmatchdata/bl1/${selectedSeason}/${selectedMatchday}`
            );
            setMatchdayData(response.data);
            props.onMatchdayChange(selectedMatchday, response.data);
        }
        fetchData();
    }, [selectedMatchday, selectedSeason]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://www.openligadb.de/api/getbltable/bl1/${selectedSeason}`
            );
            response.data.map((team, index) => {
                if (selectedMatchday === undefined) {
                    setSelectedMatchday(team.Matches);
                }
            });
        }
        fetchData();
    });

    function handleMatchdayChange(event) {
        setSelectedMatchday(event.target.value);
    }

    function handleIncrement() {
        // Only allow increment if selected matchday is not the maximum matchday
        if (selectedMatchday + 1 <= 34) {
            setSelectedMatchday(selectedMatchday + 1);
        }
    }

    function handleDecrement() {
        // Only allow decrement if selected matchday is greater than the minimum matchday
        if (selectedMatchday - 1 > 0) {
            setSelectedMatchday(selectedMatchday - 1);
        }
    }

    let options = [];
    for (let i = 1; i <= 34; i++) {
        options.push(<option value={i}>{i}</option>);
    }
    let GoalGetterID1 = 0;
    let GoalGetterID2 = 0;
    return (
        <>
        <h1 style={{ display: "flex", justifyContent: "center"}}>Matchday {selectedMatchday}</h1>
            <div style={{ display: 'flex', justifyContent: 'center'  }}>
                <button type="button" onClick={handleDecrement.bind(this)}>
                    {'<'}
                </button>
                <label>
                    Select matchday:
                    <select value={selectedMatchday} onChange={handleMatchdayChange}>
                        {options}
                    </select>
                </label>
                <button type="button" onClick={handleIncrement.bind(this)}>
                    {'>'}
                </button>
            </div>
        <div style={{ display: "flex", justifyContent: "center"}}>
        <table>
            <thead>
            <tr>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Result(HT)</th>
            </tr>
            </thead>
            <tbody>
            {matchdayData.map(game => (
                <tr key={game.MatchID}>
                    <td style={{ verticalAlign: 'top' }}>
                        <img src={game.Team1.TeamIconUrl} style={{ height: '20px', width: '20px' }} />
                        {game.Team1.TeamName}
                        <br />
                        {game.Goals.map((goal, index) => {
                            // Check if the goal increased the score for Team 1
                            if (index === 0 && goal.ScoreTeam1 > 0) {
                                return (
                                    <>
                                        {goal.ScoreTeam1}:{goal.ScoreTeam2} ({goal.MatchMinute}'){' '}
                                        {goal.GoalGetterName}
                                        <br />
                                    </>
                                );
                            } else if (index > 0 && goal.ScoreTeam1 > game.Goals[index - 1].ScoreTeam1) {
                                return (
                                    <>
                                        {goal.ScoreTeam1}:{goal.ScoreTeam2} ({goal.MatchMinute}'){' '}
                                        {goal.GoalGetterName}
                                        <br />
                                    </>
                                );
                            }
                        })}
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                        <img src={game.Team2.TeamIconUrl} style={{ height: '20px', width: '20px' }} />
                        {game.Team2.TeamName}
                        <br />
                        {game.Goals.map((goal, index) => {
                            // Check if the goal increased the score for Team 2
                            if (index === 0 && goal.ScoreTeam2 > 0) {
                                return (
                                    <>
                                        {goal.ScoreTeam1}:{goal.ScoreTeam2} ({goal.MatchMinute}'){' '}
                                        {goal.GoalGetterName}
                                        <br />
                                    </>
                                );
                            } else if (index > 0 && goal.ScoreTeam2 > game.Goals[index - 1].ScoreTeam2) {
                                return (
                                    <>
                                        {goal.ScoreTeam1}:{goal.ScoreTeam2} ({goal.MatchMinute}'){' '}
                                        {goal.GoalGetterName}
                                        <br />
                                    </>
                                );
                            }
                        })}
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                        {game.MatchResults.map(result => {
                            if (result.ResultName === "Endergebnis") {
                                return (
                                    <>
                                        {result.PointsTeam1}:{result.PointsTeam2}
                                    </>
                                );
                            }if (result.ResultName === "Halbzeit") {
                                return (
                                    <>
                                        ({result.PointsTeam1}:{result.PointsTeam2})
                                    </>
                                );
                            }
                        })} </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
            </>

    );
}

export default Matchday;