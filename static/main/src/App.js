import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import { Content, Main, PageLayout } from '@atlaskit/page-layout';
import { view } from '@forge/bridge';
import { Route, Routes } from 'react-router-dom';
import FieldConfigurationPage from './pages/FieldConfigurationPage'
import AdvanceProfilePage from './pages/AdvanceProfilePage'

function App() {
    const [data, setData] = useState(null);
    const [history, setHistory] = useState(null);
    const [historyState, setHistoryState] = useState(null);



    useEffect(() => {
        view.createHistory().then((newHistory) => {
            setHistory(newHistory);
        });
    }, []);
    
    useEffect(() => {
        if (!historyState && history) {
            setHistoryState({
                action: history.action,
                location: history.location,
            });
        }
    }, [history, historyState]);

    useEffect(() => {
        if (history) {
            history.listen((location, action) => {
                setHistoryState({
                    action,
                    location,
                });
            });
        }
    }, [history]);


    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    const main = (
        <Main
            id="main-content"
            children={
                <div style={{ padding: '35px' }}>
                    {history && historyState ? (
                        <Routes
                            navigator={history}
                            navigationType={historyState.action}
                            location={historyState.location}
                        >
                            <Route path="/configuration" element={<FieldConfigurationPage /> } />
                            <Route path="/MyFields" element={<AdvanceProfilePage />   } />
  
                        </Routes>
                    ) : (
                        'Loading...'
                    )}
                </div>
            }
        />
    );

    const content = <Content children={main} />;

    return <PageLayout children={content} />; 
}

export default App;
