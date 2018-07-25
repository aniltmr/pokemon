import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import {Line, Pie, } from "react-chartjs-2";

const ReactGridLayout = WidthProvider(RGL);


const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const pie = {
    labels: [
      'Male',
      'Female'
    ],
    datasets: [{
      data: [300, 200],
      backgroundColor: [
        '#FF6384',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#FFCE56'
      ]
    }]
  }

class MinMaxLayout extends React.PureComponent {
  constructor(props){
    super(props);
    const layout = this.generateLayout();
    this.state={
      first:{ h: 6, i: "1",   w: 6, x: 10, y: 10 },
      layout
    }
  }
  


  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    items: 3,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,
    verticalCompact: false
  };

 

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i} style={{backgroundColor:"#000000"}}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
}

  onLayoutChange(layout) {
    console.log("la", layout)
    this.props.onLayoutChange(layout);
  }

  handleMaxHeight(e){
    console.log(e.target.value)
    this.setState({first:{ h: parseInt(e.target.value), i: "1",   w:  parseInt(e.target.value), x: 10, y: 10 }})
    
  }

  onResizeStart(layout){
    console.log("alkshlashfs");
  }

  onResize(layout, oldLayoutItem, layoutItem, placeholder) {
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.
    console.log("onResize----------->", layout, layoutItem)
    if (layoutItem.h < 3 && layoutItem.w > 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }

    if (layoutItem.h >= 3 && layoutItem.w < 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }
}

  render() {
      var first={ h: 6, i: "1",   w: 6, x: 10, y: 10 }
      console.log(this.state.first)
      var second={ h: 10, i: "2",   w: 6, x: 10, y: 10 }
    return (
      <div>
        <div className="row">
          <div className="container">
            <div className="row" style={{height:"80px", backgroundColor:"#FF6347"}}>
              <div className="col-md-3"></div>
                <div className="col-md-6" style={{textAlign:"center"}}>
                  <div style={{paddingTop:"10px"}}><h2><span style={{color:"#ffffff"}}>TrackSo Energy Solar Panal</span></h2></div>
                </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>

      {/* <div className="row">
        <div className="col-md-6 col-sm-12">
            <ReactGridLayout
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
                  {...this.props}
                >
                  {this.generateDOM()}
          </ReactGridLayout>
        </div>
      </div> */}

        <ReactGridLayout  onLayoutChange={this.onLayoutChange} onResize={this.onResize} onResizeStart={this.onResizeStart}  {...this.props}>
        <div key={this.state.first.i} data-grid={this.state.first} style={{backgroundColor:"#E0FFFF"}}>
            
            <Line data={line}
                        options={{
                      maintainAspectRatio: false
                    }}
                  />
            
        </div>
        <div key={second.i} data-grid={second} style={{backgroundColor:"#E0FFFF"}}>
            <Pie data={pie}/>
        </div>
        </ReactGridLayout>
      </div>
    );
  }
}

export default MinMaxLayout;