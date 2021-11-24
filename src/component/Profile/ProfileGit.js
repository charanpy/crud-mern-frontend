import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../action/profile';

const ProfileGit = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos === null ? (
        <spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4></h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>

              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars:{repo.stargazers_count}
                </li>
                <li className='badge badge-primary'>
                  Watchers:{repo.watchers_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGit.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGit);
