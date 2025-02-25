import React from 'react';
import clsx from 'clsx';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../components/listitem';
import Chart from '../components/Chart';
import Orders from '../components/Orders';
import DataTitles from '../components/DataTitles';
import { Snackbar, Card } from '@material-ui/core';

function Copyright({ url }) {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Data Source: '}
        <Link color="primary" href={url}>
          Ministry of Health and Family Welfare
      </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {' Design and Developed By '}
        < Link color="primary" href={'https://www.linkedin.com/in/manoj-mukherjee/'}>
          Manoj Mukherjee</Link> {' © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    wordBreak: "break-all"
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
  },
}));

const Dashboard = ({ totalCountChart, titles, stateWiseData, source, error, Note, lastupdated, ...restProps }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(Note !== "");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  if (error) {
    return (<div className={classes.root}>
      <CssBaseline />
      <Grid>
        We are down!!!
    </Grid>
    </div>)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            COVID-19 India
          </Typography>
        </Toolbar>
      </AppBar>
      {/*       <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={infoOpen} autoHideDuration={20000} onClose={() => setInfoOpen(false)}>
            <Alert variant="filled" severity="info" onClose={() => setInfoOpen(false)}>{Note}</Alert>
          </Snackbar>
          <Grid container spacing={3}>
            <Grid xs={12} md={4} lg={4} item>
              <Card spacing={2}>
                <Typography component="h1" variant="h6" color="error">
                  Helpline Number: +91-11-23978046
                </Typography>
              </Card>

            </Grid>
            <Grid xs={12} md={4} lg={4} item>
              <Card spacing={2}>
                <Typography component="h1" variant="h6" color="error">
                  Toll Free: 1075
                </Typography>
              </Card>

            </Grid>

            <Grid xs={12} md={4} lg={4} item>
              <Card spacing={2}>
                <Typography component="h1" variant="h6" color="error">
                  Helpline Email ID: ncov2019@gov.in
                </Typography>
              </Card>
            </Grid>
            {/* Chart */}
            <Grid container>
              <Grid item xs>
                <Paper className={fixedHeightPaper}>
                  <Chart {...totalCountChart} />
                </Paper>
              </Grid>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12}>
              <Grid container justify="center" spacing={3}>
                <Grid xs={12} md={12} lg={12} item>
                  <Typography component="h1" variant="h6" color="inherit">
                    {lastupdated}
                  </Typography>
                </Grid>
                {titles.map((t, i) => (
                  <Grid key={i} xs={12} md={6} lg={3} item>
                    <Paper className={classes.paper} style={{ textAlign: 'center', minHeight: '150px' }}><DataTitles {...t} /></Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Orders {...stateWiseData} />
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright {...source} />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const protocol = (req && req.connection.encrypted ? 'https' : 'http') + '://';
    let baseUrl = req ? `${protocol}${req.headers.host}` : '';
    if (typeof window !== 'undefined') {
      baseUrl = window.location.origin;
    }
    const res = await fetch(`${baseUrl}/api/coronain`);
    const data = await res.json();
    if (!data) {
      throw new Error('Data server down');
    }
    const { Total_Confirmed_cases, death } = data.Total;
    //const aY = parseInt(indian);
    //const bY = parseInt(foreigner);
    const activCase = data.Totalinfo['active_cases'];
    const curedCase = data.Total['Cured/Discharged/Migrated'];
    const titles = [{
      title: 'Total Confirm Cases',
      count: Total_Confirmed_cases
    },
    {
      title: 'Active Cases',
      count: activCase
    },
    {
      title: 'Deaths',
      count: death
    },
    {
      title: 'Cured / Discharged/ Migrated',
      count: curedCase
    }
    ];

    const statesData = data['effected states'];
    const stateDataColumn = [{ title: 'State/UT', field: 'state' },
    { title: 'Total Confirm Cases', field: 'totalcase' },
    { title: 'Cured / Discharged / Migrated', field: 'cured' },
    { title: 'Deaths', field: 'death' }
    ];
    const dataStates = statesData.map((a) => ({
      "state": a.namestateorut,
      "totalcase": a.totalConfirmcase,
      "cured": a['Cured/Discharged/Migrated'],
      "death": a.death
    }));

    return {
      props: {
        totalCountChart: {
          data: [{ name: "Active Cases", y: parseInt(activCase), color: 'rgb(128, 100, 198)' },
          { name: "Cured/Migrated", y: parseInt(curedCase), color: 'rgb(100, 145, 80)' },
          { name: "Deaths", y: parseInt(death), color: 'rgb(241, 92, 128)' }
          ],
          title: `COVID-19 INDIA ${data.Lastupdated}`
        },
        titles: titles || [],
        lastupdated: data.Lastupdated,
        stateWiseData: {
          columns: stateDataColumn,
          data: dataStates
        },
        source: {
          url: data.Datasourceurl
        },
        Note: data.Note
      }
    };
  }
  catch (err) {
    console.log(err);
    return { props: { error: 'Something went wrong' } }
  }
}

export default Dashboard;