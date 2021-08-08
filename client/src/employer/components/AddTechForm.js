import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../Config";
import Lottie from "react-lottie";
import WorkingImage from "../lotties/working.json";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 150,
  },
  comboBox: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 20,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
}));

const AddTechForm = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WorkingImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [state, setState] = useState({
    data: [],
  });
  const [selectedMainCategory, selectedMainCategoryFn] = useState();
  const [selectedSubCategory, selectedSubCategoryFn] = useState();
  var selectedStack;

  const data = state.data;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/technologies/`).then((res) => {
      if (res.data.success) {
        // console.log(res.data.existingData);
        setState({
          data: res.data.existingData,
        });
      }

      console.log(data);
    });


  }, []);

  const getMainCategories = () => {
    var temp = [];

    data.forEach((element) => {
      temp.push({ category: element.name, stack: element.stack });
    });

    return temp;
  };

  const getSubCategories = () => {
    var temp = [];

    data.forEach((e) => {
      if (e.name == selectedMainCategory) {
        Object.keys(e.stack).map((key, value) => {
          // console.log(key)
          // console.log(value)
          // if (key.name == selectedMainCategory) {
          temp.push({ category: key });
          // }
        });
      }
    });

    return temp;
  };
  const getStack = () => {
    var temp = [];

    data.forEach((e) => {
      console.log(e);
      if (e.name == selectedMainCategory) {
        Object.keys(e.stack).map((key, value) => {
          if (key == selectedSubCategory) {
            // console.log(value);
            // console.log(key);
            Object.values(e.stack).map((k, v) => {
              if (value == v) {
                console.log(k);
                k.forEach((element) => {
                  temp.push({ category: element });
                });
              }
            });
          }
        });
      }
    });

    return temp;
  };

  function submitForm() {
    console.log(selectedStack.category);
    console.log(selectedMainCategory);
    console.log(selectedSubCategory);

    var currentTechStack;
    var temp = null;
    var flag = true;

    axios
      .get(`${BACKEND_URL}/employers/` + "60c246913542f942e4c84454")
      .then((res) => {
        // console.log(res.data.employer);
        if (res.data.success) {
          currentTechStack = res.data.employer.technologyStack;

          currentTechStack.forEach((mainCategory) => {
            if (mainCategory.name == selectedMainCategory) {
              flag = false;
              if (
                mainCategory.stack.frontEnd != undefined &&
                selectedSubCategory == "frontEnd"
              ) {
                console.log("Front end");
                if (
                  !mainCategory.stack.frontEnd.includes(selectedStack.category)
                ) {
                  console.log("selected " + selectedStack.category);
                  mainCategory.stack.frontEnd.push(selectedStack.category);
                  return;
                }
              } else if (
                mainCategory.stack.backEnd != undefined &&
                selectedSubCategory == "backEnd"
              ) {
                console.log("Back end");
                if (
                  !mainCategory.stack.backEnd.includes(selectedStack.category)
                ) {
                  console.log("selected " + selectedStack.category);
                  mainCategory.stack.backEnd.push(selectedStack.category);
                  return;
                }
              } else if (
                mainCategory.stack.list != undefined &&
                selectedSubCategory == "list"
              ) {
                console.log("List");

                if (!mainCategory.stack.list.includes(selectedStack.category)) {
                  console.log("selected " + selectedStack.category);
                  mainCategory.stack.list.push(selectedStack.category);
                  return;
                }
              } else {
                mainCategory.stack[selectedSubCategory] = [
                  selectedStack.category,
                ];
                return;
              }
            }
          });
          if (flag) {
            console.log('flag')
            temp = {
              name: selectedMainCategory,
              stack: {
                [selectedSubCategory]: [selectedStack.category],
              },
            };
            currentTechStack.push(temp);
          }
        }

        console.log(currentTechStack);


        // send currentTechStack to backend

      });
  }


  const toggleMainCategory = (event, values) => {
    selectedMainCategoryFn(values.category);
    console.log(selectedMainCategory);
  };

  const toggleSubCategory = (event, values) => {
    selectedSubCategoryFn(values.category);
    console.log(selectedSubCategory);
  };
  const toggleStack = (event, values) => {
    selectedStack = values;
  };

  return (
    <Grid container direction="column" xs={12} spacing={3}>
              <FloatCard>
          <Grid item className={classes.comboBox}>
            <Typography variant="h6" className={classes.title}>
              Add Technologies
            </Typography>
            <AddIcon className={classes.notificationsIcon} />
          </Grid>

          <Grid item className={classes.comboBox}>
            <Autocomplete
              id="main-categories"
              options={getMainCategories()}
              getOptionLabel={(option) => option.category}
              onChange={toggleMainCategory}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Main Category"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item className={classes.comboBox}>
            <Autocomplete
              id="sub-categories"
              options={getSubCategories()}
              onChange={toggleSubCategory}
              getOptionLabel={(option) => option.category}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Sub Category"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item className={classes.comboBox}>
            <Autocomplete
              id="technologies"
              options={getStack()}
              onChange={toggleStack}
              getOptionLabel={(option) => option.category}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose technologies"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item className={classes.comboBox}>
            <Button
              onClick={submitForm}
              variant="contained"
              className={classes.button}
            >
              SAVE
            </Button>
          </Grid>
          <Grid item className={classes.comboBox}>
            <Lottie
              className={classes.lottie}
              options={defaultOptions}
              height={"inherit"}
              width={"inherit"}
            />

          </Grid>
        </FloatCard>
    </Grid>
  );
};

export default AddTechForm;
