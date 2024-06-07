import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchAboutData } from '../actions/aboutActions';
import { Spinner, Alert } from 'react-bootstrap';
import '../assets/styles/About.css';

interface AboutProps {
  fetchAboutData: () => void;
  data: any;
  loading: boolean;
  error: string | null;
}

const About: React.FC<AboutProps> = ({ fetchAboutData, data, loading, error }) => {
  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div>
      <h1>About Page</h1>
      <p>
        {data ? data.description : 'Loading...'}
      </p>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.about.data,
  loading: state.about.loading,
  error: state.about.error
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchAboutData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(About);
