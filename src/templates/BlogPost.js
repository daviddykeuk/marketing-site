import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { createUseStyles } from 'react-jss';

import { SEO, InterstitialTitle } from 'components';
import StickyFooter from 'components/layouts/StickyFooter';
import PostHeader from 'components/blog/PostHeader';
import FormSubmissionModal from 'components/actions/FormSubmissionModal';
import SubscribeToNewsletter from 'components/actions/SubscribeToNewsletter';

const useStyles = createUseStyles((theme) => ({
  main: theme.preMadeStyles.content,

  callToActionWrapper: {
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: 'center',
  },

  callToActionParagraph: {
    marginBottom: 24,
    marginTop: 0,
  },
}));

const MAX_WIDTH_BREAKPOINT = 'md';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <FormSubmissionModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        titleText="You're subscribed!"
        bodyText="You should receive the first edition within a week."
      />

      <StickyFooter maxWidthBreakpoint={MAX_WIDTH_BREAKPOINT} location={location}>
        <main className={classes.main}>
          <article>
            <PostHeader post={post} />
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </main>

        <div className={classes.callToActionWrapper}>
          <InterstitialTitle text="Become a Backstage expert" />
          <p className={classes.callToActionParagraph}>
            To get the latest news, deep dives into Backstage features, and a roundup of recent
            open-source action, sign up for Roadie&apos;s Backstage Weekly.{' '}
            <a href="https://backstage-weekly.roadie.io" target="_blank" rel="noopener noreferrer">
              See recent editions.
            </a>
          </p>
          <SubscribeToNewsletter setModalOpen={setModalOpen} buttonText="Subscribe" />
        </div>
      </StickyFooter>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
