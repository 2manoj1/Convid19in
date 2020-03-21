import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Highcharts from 'highcharts/highcharts'
import Highcharts3D from 'highcharts/highcharts-3d'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import ResizeDetector from 'react-resize-detector';
import Title from './Title';
import { Grid, Box } from '@material-ui/core';




if (typeof Highcharts === 'object') {
    Highcharts3D(Highcharts);
    HighchartsExporting(Highcharts)
}

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.parentRef = React.createRef();
        this.chartRef = React.createRef();
        this.state = {
            chartOptions: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: props.title
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>total: {point.total}',
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>count: {point.y}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Corona',
                    data: [{ name: 'INDIAN', y: 244, color: 'rgb(241, 92, 128)' },
                    { name: 'FOREIGNER', y: 39, color: 'rgb(124, 181, 236)' }]
                }]
            }
        }
    }

    setHoverData = (e) => {
        // The chart is not updated because `chartOptions` has not changed.
        this.setState({ hoverData: e.target.category })
    }

    updateSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                series: [
                    { data: [Math.random() * 5, 2, 1] }
                ]
            }
        });
    }

    onResize = (width, height) => {
        //this.setState({width, height});
        if (this.chartRef && this.chartRef.current) {
            this.chartRef.current.chart.reflow();
        }
    }


    render() {
        const { chartOptions } = this.state;
        return (
            <>
                <Box width="100%" height="100%" ref={this.parentRef}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                        containerProps={{ style: { height: "100%", width: "100%" } }}
                        ref={this.chartRef}
                    />
                </Box>
                <ResizeDetector handleWidth handleHeight onResize={this.onResize} targetDomEl={this.parentRef.current} />
            </>
        )
    }
}



export default LineChart;