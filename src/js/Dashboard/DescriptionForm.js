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

    /**
     * Returning the appropriate form depending on the category submitted
     * @returns {*}
     */
    categoryDescription(){
        switch(this.props.category){
            case 'Television': return this.televisionDescription();
            case 'Monitor': return this.monitorDescription();
            case 'Tablet':
            case 'TabletComputer': return this.computerDescription('tablet');
            case 'Desktop':
            case 'DesktopComputer': return this.computerDescription('desktop');
            case 'Laptop':
            case 'LaptopComputer': return this.computerDescription('laptop');
            default: return;
        }
    }

    /**
     * Television
     * @returns {XML}
     */
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

    /**
     * Monitor
     * @returns {XML}
     */
    monitorDescription(){
        return(
            <input
                className={this.props.errors["size"] ? "error":""}
                type="text"
                placeholder={'Enter Monitor Size'}
                value={this.state.currentDescription["size"]}
                id="size"
                onChange={this.handleChange}
            />
        );
    }

    /**
     * Depending on the computer type, the appropriate form is returned
     * @param computerType
     * @returns {XML}
     */
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
                    className={this.props.errors["processor"] ? "error":""}
                    type="text"
                    placeholder={'Enter Processor Type'}
                    value={this.state.currentDescription["processor"]}
                    id="processor"
                    onChange={this.handleChange}
                />
                <input
                    className={this.props.errors["RAM"] ? "error":""}
                    type="text"
                    placeholder={'Enter RAM size'}
                    value={this.state.currentDescription["RAM"]}
                    id="RAM"
                    onChange={this.handleChange}
                />
                <input
                    className={this.props.errors["cores"] ? "error":""}
                    type="text"
                    placeholder={'Enter Number of CPU cores'}
                    value={this.state.currentDescription["cores"]}
                    id="cores"
                    onChange={this.handleChange}
                />
                <input
                    className={this.props.errors["HDSize"] ? "error":""}
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

    /**
     * Tablet
     * @returns {XML}
     */
    tabletDescription(){
        return(
            <div>
                <input
                    className={this.props.errors["OS"] ? "error":""}
                    type="text"
                    placeholder={'Enter Built-in Operating System'}
                    value={this.state.currentDescription["OS"]}
                    id="OS"
                    onChange={this.handleChange}
                />
                <input
                    className={this.props.errors["battery"] ? "error":""}
                    type="text"
                    placeholder={'Enter Battery Information'}
                    value={this.state.currentDescription["battery"]}
                    id="battery"
                    onChange={this.handleChange}
                />
                <br/>
                <input
                    className={this.props.errors["camera"] ? "error":""}
                    type="text"
                    placeholder={'Enter Camera Information'}
                    value={this.state.currentDescription["camera"]}
                    id="camera"
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    /**
     * desktop doesn't have particularities
     */
    desktopDescription(){}

    /**
     * Laptop
     * @returns {XML}
     */
    laptopDescription(){
        return(
            <div>
                <input
                    className={this.props.errors["OS"] ? "error":""}
                    type="text"
                    placeholder={'Enter Built-in Operating System'}
                    value={this.state.currentDescription["OS"]}
                    id="OS"
                    onChange={this.handleChange}
                />
                <input
                    className={this.props.errors["battery"] ? "error":""}
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


    /**
     * Changes are sent to newProductRequest component
     * @param e
     */
    handleChange(e){
        var desc = this.state.currentDescription;
        desc[e.target.id] = e.target.value;
        this.setState({currentDescription: desc});
        this.props.onDescriptionChange(this.state.currentDescription);
    }

    render(){
        return(
        <div>
            <h4> Adding a {this.props.category}</h4>
            <input
                className={this.props.errors["price"] ? "error":""}
                type="text"
                placeholder={'Enter Price'}
                value={this.state.currentDescription['price']}
                id="price"
                onChange={this.handleChange}
            />
            <input
                className={this.props.errors["modelNumber"] ? "error":""}
                type="text"
                placeholder={'Enter Product Model Number'}
                value={this.state.currentDescription['modelNumber']}
                id="modelNumber"
                onChange={this.handleChange}
            />
            <br/>
            <input
                className={this.props.errors["weight"] ? "error":""}
                type="text"
                placeholder={'Enter Product Weight'}
                value={this.state.currentDescription['weight']}
                id="weight"
                onChange={this.handleChange}
            />

            <input
                className={this.props.errors["brand"] ? "error":""}
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