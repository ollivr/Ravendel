import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  IconButton,
  Chip,
  Divider,
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogAddAction, blogtagsAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";
import { isEmpty } from "../../utils/helper";
import service, { getUpdatedUrl } from "../../utils/service";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "react-select";

const StyledRadio = (props) => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};

var defaultObj = {
  status: "Publish",
  blog_tag: [],
  url: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const AddBlog = (props) => {
  const classes = viewStyles();
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState(defaultObj);
  const [tags, setTags] = useState([]);
  const [clearTags, setclearTags] = useState([]);
  const [editPremalink, setEditPermalink] = useState(false);

  useEffect(() => {
    props.blogtagsAction();
  }, []);

  useEffect(() => {
    const tagObj = props.blogState.tags.map((tag) => {
      return {
        value: tag.id,
        label: tag.name,
      };
    });

    setTags([...tagObj]);
  }, [props.blogState.tags]);

  useEffect(() => {
    if (props.blogState.success) {
      document.forms[0].reset();
      setBlog(defaultObj);
      setfeatureImage(null);
      setclearTags([]);
    }
  }, [props.blogState.success]);

  useEffect(() => {
    if (props.blogState.blog.content !== undefined) {
      setBlog({ ...blog, content: props.blogState.blog.content });
    }
  }, [props.blogState.blog.content]);

  const addBlog = (e) => {
    e.preventDefault();
    props.blogAddAction(blog);
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const tagChange = (e) => {
    if (!isEmpty(e)) {
      setclearTags(e);
      setBlog({ ...blog, blog_tag: e.map((tag) => tag.value) });
    }
  };

  const metaChange = (e) => {
    setBlog({
      ...blog,
      meta: { ...blog.meta, [e.target.name]: e.target.value },
    });
  };

  const fileChange = (e) => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
  };

  const changePermalink = () => {
    if (editPremalink) {
      isUrlExist(blog.url);
    }
    setEditPermalink(!editPremalink);
  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("Blog", url);
    setBlog({
      ...blog,
      url: updatedUrl,
    });
  };

  return (
    <Fragment>
      {props.blogState.loading && <Loading />}
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-pages">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add Blog</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={addBlog}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-blogs" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            <Card>
              <CardHeader title="Blog Information" />
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid item md={12}>
                    <TextField
                      id="title"
                      label="Title"
                      name="title"
                      onChange={handleChange}
                      onBlur={(e) => !blog.url && isUrlExist(blog.title)}
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  {blog.url ? (
                    <span style={{ marginBottom: 10, display: "block" }}>
                      <strong>Link: </strong>
                      {window.location.origin}/blog/
                      {editPremalink === false && blog.url}
                      {editPremalink === true && (
                        <input
                          id="url"
                          name="url"
                          value={blog.url}
                          onChange={handleChange}
                          variant="outlined"
                          className={classes.editpermalinkInput}
                        />
                      )}
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={changePermalink}
                        className={classes.editpermalinkInputBtn}
                      >
                        {editPremalink ? "Ok" : "Edit"}
                      </Button>
                    </span>
                  ) : null}
                </Grid>

                <Grid container>
                  <Grid item md={12}>
                    <TinymceEditor />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Meta Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <TextField
                        id="meta-title"
                        label="Meta Title"
                        name="title"
                        variant="outlined"
                        className={clsx(classes.width100)}
                        onChange={metaChange}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="keywords"
                        variant="outlined"
                        className={clsx(classes.width100)}
                        onChange={metaChange}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <TextField
                        id="meta-description"
                        label="Meta-description"
                        name="description"
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        multiline
                        rows="4"
                        onChange={metaChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={3} md={12}>
            <Box>
              <Card>
                <CardHeader title="Status" />
                <Divider />
                <CardContent>
                  <RadioGroup
                    defaultValue="Publish"
                    name="status"
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="Publish"
                      control={<StyledRadio />}
                      label="Publish"
                    />
                    <FormControlLabel
                      value="Draft"
                      control={<StyledRadio />}
                      label="Draft"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Featured Image" />
                <CardContent>
                  <Grid item md={12}>
                    {featureImage !== null && (
                      <Box className={classes.feautedImageBox}>
                        <img
                          src={featureImage}
                          className={classes.feautedImageBoxPreview}
                          alt="featured"
                        />
                      </Box>
                    )}
                    <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="featured-image"
                      name="feature_image"
                      type="file"
                      onChange={fileChange}
                    />
                    <label
                      htmlFor="featured-image"
                      className={classes.feautedImage}
                    >
                      <ImageIcon />{" "}
                      {featureImage !== null
                        ? "Change Featured Image"
                        : "Set Featured Image"}
                    </label>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Tags" />
                <Divider />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    className={classes.marginBottom1}
                  >
                    Select Tags
                  </Typography>

                  {/* <Autocomplete
                    multiple
                    id="select-tags"
                    options={tags}
                    getOptionLabel={option => option.name}
                    className={classes.width100}
                    onChange={(event, value) => handleChangeTag(value)}
                    renderInput={params => (
                      <TextField {...params} variant="outlined" />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                  /> */}
                </CardContent>
              </Card>

              <Select
                isMulti
                value={clearTags}
                name="blog_tag"
                options={tags}
                onChange={tagChange}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    blogState: state.blogs,
  };
};

const mapDispatchToProps = {
  blogAddAction,
  blogtagsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
