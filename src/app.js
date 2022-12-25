import React, { useState} from 'react';
import Table from './Table';
import './app.css';
import GoalScorer from './GoalScorer';
import Matchday from './Matchday.js';

import axios from 'axios';

function App() {
    let currentYear = new Date().getFullYear();
    if(new Date().getMonth() < 7) {
        currentYear--;
    }
    const [selectedSeason, setSelectedSeason] = useState(currentYear);

    document.title = 'Bundesliga Data';


    return (
        <>
            <header>
                <div style={{ display: 'block', textAlign:'center' }}>
                    DFL Bundesliga Data  visualization by <a href="https://tr3x.xyz" style={{textDecoration:'none',color:"white"}}> @LeonBurghardt</a> | Database provided by <a href="https://www.openligadb.de" style={{textDecoration:'none',color:"white"}}>@OpenLigaDB</a>
                </div>

            </header>
            <br />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flexGrow: 1 }}>
                    <Table
                        onSeasonChange={(season, data) => {
                            setSelectedSeason(season);
                        }}
                    />
                </div>
                <div style={{ flexGrow: 2 }}>
                    <Matchday
                        selectedSeason={selectedSeason}
                    />
                </div>
                <div style={{ flexGrow: 3 }}>
                    <GoalScorer selectedSeason={selectedSeason} />
                </div>
            </div>
            <br />
            <br />
            <div>

            </div>


        </>
    );
}
export default App;