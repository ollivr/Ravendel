import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  CardActionArea,
  Hidden,
  Divider
} from "@material-ui/core";
import PageTitle from "../components/pageTitle";
import { Link } from "react-router-dom";
import BlogSidebar from "../blog/blogSidebar";

const Tags = props => {
  const [tagName, setTagName] = useState(props.match.params.name);

  useEffect(() => {
    setTagName(props.match.params.name);
  }, [props.match.params.name]);

  const blogs = [
    {
      id: 1,
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg",
      title: "Blog First",
      description: "Blog first lorem ipsom dolr sit"
    },
    {
      id: 2,
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-4.jpg",
      title: "Blog Second",
      description: "Blog second lorem ipsom dolr sit"
    },
    {
      id: 3,
      featured_image:
        "https://colorlib.com/preview/theme/essence/img/bg-img/bg-3.jpg",
      title: "Blog Third",
      description: "Blog third lorem ipsom dolr sit"
    }
  ];

  return (
    <Fragment>
      <PageTitle title={tagName} />
      <Container>
        <Grid container spacing={4} className="margin-top-3 margin-bottom-3">
          <Grid item md={9} sm={12} xs={12}>
            <Grid container spacing={3}>
              {blogs &&
                blogs.map((blog, index) => (
                  <Grid item lg={6} md={6} sm={6} key={index}>
                    <Card className="blog-card">
                      <Link to={`blog/${blog.id}`}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="175"
                            image={blog.featured_image}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h2"
                            >
                              {blog.title}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              component="p"
                            >
                              {blog.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                      <CardActions>
                        <Link to={`/blog/${blog.id}`}>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Hidden lgUp>
            <Divider className="margin-top-2 margin-bottom-3" />
          </Hidden>
          <Grid item md={3} sm={12} xs={12}>
            <BlogSidebar />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Tags);
