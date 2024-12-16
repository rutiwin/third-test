import React, { useState } from 'react';
import './Header.css';
import { serverModel } from '../../models/ServerModel';

type HeaderProps = {
    handleSearch: (serverCreationTime?: boolean, isOnline?: boolean) => void;
    servers: Array<Partial<serverModel>>;
};

const Header = ({ handleSearch, servers }: HeaderProps) => {
    const [isCreatedChecked, setIsCreatedChecked] = useState(false);
    const [isActiveChecked, setIsActiveChecked] = useState(false);  

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const checked = event.target.checked;    
        if (type === "created") {
            setIsCreatedChecked(checked);
        } else if (type === "active") {
            setIsActiveChecked(checked);
        }
    
        handleSearch(
            type === "created" ? checked : isCreatedChecked,
            type === "active" ? checked : isActiveChecked
        );
    };    

    return (
        <div className="header-container">
            <h1>The server management application</h1>
            <form id="searchForm" className="mb-4">
                <div className="input-group">
                    <h4 className="form-check-h4">
                        Sort by:
                    </h4>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="createdFlexCheck"
                            checked={isCreatedChecked}
                            onChange={(e) => handleCheckboxChange(e, "created")}
                        />
                        <label className="form-check-label" htmlFor="createdFlexCheck">
                            Recently created server
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="ActiveFlexCheck"
                            checked={isActiveChecked}
                            onChange={(e) => handleCheckboxChange(e, "active")}
                        />
                        <label className="form-check-label" htmlFor="ActiveFlexCheck">
                            Active servers
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Header;