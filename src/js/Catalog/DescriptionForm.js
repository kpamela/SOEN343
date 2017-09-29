/**
 * Created by CharlesPhilippe on 2017-09-28.
 */
import React from 'react';

export default class DescriptionForm extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            currentDescription: {}};

        this.handleChange = this.handleChange.bind(this);
    }

    categoryDescription(){
        switch(this.props.category){
            case 'Television': return this.televisionDescription();
            case 'Monitor': return this.monitorDescription();
            case 'TabletComputer': return this.computerDescription('tablet');
            case 'DesktopComputer': return this.computerDescription('desktop');
            case 'LaptopComputer': return this.computerDescription('laptop');
            default: return;
        }
    }

    televisionDescription(){
        return(
            <div>
                <select id="TelevisionType" value={this.state.currentDescription["type"]} onChange={this.handleChange}>
                    <option value="" default>Select Type</option>
                    <option value="HD LED">LED</option>
                    <option value="Smart">Smart</option>
                    <option value="3d">3d</option>
                </select>
            </div>
        );
    }
    monitorDescription(){
        return(
            <input
                type="text"
                placeholder={'Enter Monitor Size'}
                value={this.state.currentDescription["size"]}
                id="size"
                onChange={this.handleChange}
            />
        );
    }

    computerDescription(computerType){
        let typeDescription;
        switch (computerType){
            case 'tablet': typeDescription = this.tabletDescription();
                            break;
            case 'desktop': typeDescription = this.desktopDescription();
                            break;
            case 'laptop':typeDescription = this.laptopDescription();
                            break;
            default: break;
        }
        return(
            <div>
                <input
                    type="text"
                    placeholder={'Enter Processor Type'}
                    value={this.state.currentDescription["processor"]}
                    id="processor"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder={'Enter RAM size'}
                    value={this.state.currentDescription["RAM"]}
                    id="RAM"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder={'Enter Number of CPU cores'}
                    value={this.state.currentDescription["cores"]}
                    id="cores"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder={'Enter Hard Drive Size'}
                    value={this.state.currentDescription["HDSize"]}
                    id="HDSize"
                    onChange={this.handleChange}
                />
                <br/>
                {typeDescription}
            </div>
        );
    }

    tabletDescription(){
        return(
            <div>
                <input
                    type="text"
                    placeholder={'Enter Built-in Operating System'}
                    value={this.state.currentDescription["OS"]}
                    id="OS"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder={'Enter Battery Information'}
                    value={this.state.currentDescription["battery"]}
                    id="battery"
                    onChange={this.handleChange}
                />
                <br/>
                <input
                    type="text"
                    placeholder={'Enter Camera Information'}
                    value={this.state.currentDescription["camera"]}
                    id="camera"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
    desktopDescription(){}
    laptopDescription(){
        return(
            <div>
                <input
                    type="text"
                    placeholder={'Enter Built-in Operating System'}
                    value={this.state.currentDescription["OS"]}
                    id="OS"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder={'Enter Battery Information'}
                    value={this.state.currentDescription["battery"]}
                    id="battery"
                    onChange={this.handleChange}
                />
                <br/>
                <label>
                    Camera
                <input
                    type="checkbox"
                    value={this.state.currentDescription["camera"]}
                    id="camera"
                    onChange={this.handleChange}
                />
                </label>
                <label>
                    Touch-Screen
                <input
                    type="checkbox"
                    value={this.state.currentDescription["touch"]}
                    id="touch"
                    onChange={this.handleChange}
                />
                </label>
        </div>
        );
    }



    handleChange(e){
        var desc = this.state.currentDescription;
        desc[e.target.id] = e.target.value;
        this.setState({currentDescription: desc});
        this.props.onDescriptionChange(this.state.currentDescription);
    }

    render(){
        return(
        <div>
            <input
                type="text"
                placeholder={'Enter Product Serial Number'}
                value={this.state.currentDescription['serialNumber']}
                id="serialNumber"
                onChange={this.handleChange}
            />
            <input
                type="text"
                placeholder={'Enter Product Model Number'}
                value={this.state.currentDescription['modelNumber']}
                id="modelNumber"
                onChange={this.handleChange}
            />
            <br/>
            <input
                type="text"
                placeholder={'Enter Product Weight'}
                value={this.state.currentDescription['weight']}
                id="weight"
                onChange={this.handleChange}
            />

            <input
                type="text"
                placeholder={'Enter Product Brand Name'}
                value={this.state.currentDescription['brand']}
                id="brand"
                onChange={this.handleChange}
            />
            <br/>
            {this.categoryDescription()}
            <br/>
            <textarea
                type="text"
                placeholder={'Enter Additional Information'}
                value={this.state.currentDescription['additionalInfo']}
                id="additionalInfo"
                onChange={this.handleChange}
                />
        </div>
        );

    }

}