import React, { Component } from 'react'
import Card from '../Components/Card'
import { map } from 'lodash';
import cx from 'classnames'
import '../Style/style.css'

class ProductCard extends Component {
    constructor() {
        super();
        this.state = {
            dataarray: [],
            loading: false,
            page: 0,
            prevY: 0,
        };
    }
    componentDidMount() {
        debugger
        this.getdata()
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef)
    }
    handleObserver(entities, observer) {
        debugger
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastindex = this.state.dataarray.length - 1;
            // this.getdata(lastindex);
        }
        this.setState({
            prevY: y
        })
    }
    getdata = (id) => {
        debugger
        let newdataarray = []
        let data = [...this.props.carddata]
        console.log("data", data)
        debugger
        newdataarray = data.splice(0, 20)
        this.setState({
            dataarray: newdataarray
        })
    }
    render() {
        console.log("this.state.dataarray", this.state.dataarray)
        console.log("this", this)
        //Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        //To change the loading icon behavious
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            // <div class="container">
            //     <div class={cx("row", "content")} style={{ paddingTop: "50px" }}>
            //         {
            //             map(this.props.carddata, (data, index) => {
            //                 // console.log("data",data)
            //                 return < div class="col-md-4" style={{ paddingTop: "16px", paddingBottom: "16px" }} >
            //                     <Card
            //                         id={data.id}
            //                         image={data.image}
            //                         product={data.product}
            //                         description={data.description}
            //                         price={data.price}
            //                         currency={data.currency}
            //                         full_description={data.full_description}
            //                         additional_image={data.additional_image}
            //                         brand={data.brand}
            //                         jew_size={data.jew_size}
            //                         avlble={data.avlble}
            //                     />
            //                 </div>
            //             })
            //         }
            //     </div>
            // </div >

            <div className="container">
                <div style={{ minHeight: "800px" }} class={cx("row", "content")} style={{ paddingTop: "50px" }}>
                    {
                        map(this.state.dataarray, (data, index) => {
                            console.log("data", data)
                            return < div class="col-md-4" style={{ paddingTop: "16px", paddingBottom: "16px" }} >
                                <Card
                                    id={data.id}
                                    image={data.image}
                                    product={data.product}
                                    description={data.description}
                                    price={data.price}
                                    currency={data.currency}
                                    full_description={data.full_description}
                                    additional_image={data.additional_image}
                                    brand={data.brand}
                                    jew_size={data.jew_size}
                                    avlble={data.avlble}
                                />
                            </div>
                        })
                    }
                    <div
                        ref={loadingRef => (this.loadingRef = loadingRef)}
                        style={loadingCSS}
                        style={{ color: "red" }}
                    >
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard