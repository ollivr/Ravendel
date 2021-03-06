import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Tooltip,
  IconButton,
  Icon,
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { appearanceHomeUpdateAction } from "../../../store/action";
import { connect } from "react-redux";
import { isEmpty } from "../../../utils/helper";

const HomeSettings = (props) => {
  const classes = viewStyles();

  const [settingHome, setsettingHome] = useState({
    ...props.settingState.settings.appearance.home,
  });

  useEffect(() => {
    setsettingHome({
      ...props.settingState.settings.appearance.home,
    });
  }, [props.settingState.settings.appearance.home]);

  const addSlide = () => {
    setsettingHome({
      ...settingHome,
      slider: [
        ...settingHome.slider,
        {
          image: {},
          link: "",
          open_in_tab: false,
        },
      ],
    });
  };

  const removeSlide = (i) => {
    /*  slider.splice(i, 1);
    setSlider([...slider]); */
    settingHome.slider.splice(i, 1);
    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
  };

  const handleChange = (e, i) => {
    if (e.target.name === "link") {
      settingHome.slider[i].link = e.target.value;
    } else {
      settingHome.slider[i].open_in_tab = e.target.checked;
    }

    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
  };

  const fileChange = (e, i) => {
    settingHome.slider[i].image.original = URL.createObjectURL(
      e.target.files[0]
    );
    settingHome.slider[i].update_image = e.target.files;
    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
    //console.log(slider);
  };

  const updateHome = () => {
    console.log(settingHome);
    for (let i in settingHome.slider) {
      delete settingHome.slider[i].__typename;
    }

    delete settingHome.add_section_in_home.__typename;

    props.appearanceHomeUpdateAction(settingHome);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom3}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  {settingHome.slider.map((slide, index) => (
                    <Grid item md={4} sm={12} xs={12} key={index}>
                      <Box className={classes.sliderImageWrapper}>
                        <Tooltip title="Remove Slide" aria-label="remove-slide">
                          <IconButton
                            aria-label="remove-slide"
                            onClick={(e) => removeSlide(index)}
                            size="small"
                            className={clsx(
                              classes.deleteicon,
                              classes.slideRemove
                            )}
                          >
                            <Icon>clear</Icon>
                          </IconButton>
                        </Tooltip>
                        <Box className={classes.sliderImagePreviewWrapper}>
                          {slide.image.original && (
                            <img
                              src={slide.image.original}
                              className={classes.sliderImagePreview}
                              alt="Featured"
                            />
                          )}
                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: "none" }}
                            id={`featured-image-${index}`}
                            name={`featured-image-${index}`}
                            type="file"
                            onChange={(e) => fileChange(e, index)}
                          />
                          <label
                            htmlFor={`featured-image-${index}`}
                            className={classes.feautedImage}
                          >
                            {slide.image.original
                              ? "Change Slider"
                              : "Add Slide Image"}
                          </label>
                        </Box>
                        <Box className={classes.slidesInfo}>
                          <TextField
                            label="Slide Link"
                            variant="outlined"
                            name="link"
                            className={clsx(classes.width100)}
                            value={slide.link}
                            onChange={(e) => handleChange(e, index)}
                            size="small"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={slide.open_in_tab}
                                onChange={(e) => handleChange(e, index)}
                              />
                            }
                            label="Open in New Tab"
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={addSlide}
                  size="small"
                >
                  + Add Slide
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Add Section in Home Page
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={settingHome.add_section_in_home.feature_product}
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          feature_product: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Featured product"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      settingHome.add_section_in_home.recently_added_products
                    }
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          recently_added_products: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Recently Added Products"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      settingHome.add_section_in_home.most_viewed_products
                    }
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          most_viewed_products: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Most Viewed Products"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      settingHome.add_section_in_home.recently_bought_products
                    }
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          recently_bought_products: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Recently Bought Products"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      settingHome.add_section_in_home.product_recommendation
                    }
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          product_recommendation: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Product Recommendation (Based on Your Browsing History)"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={settingHome.add_section_in_home.products_on_sales}
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          products_on_sales: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Products on Sales"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      settingHome.add_section_in_home
                        .product_from_specific_categories
                    }
                    onChange={(e) =>
                      setsettingHome({
                        ...settingHome,
                        add_section_in_home: {
                          ...settingHome.add_section_in_home,
                          product_from_specific_categories: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Product from Specific Categories"
              />
            </FormGroup>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateHome}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  appearanceHomeUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSettings);
