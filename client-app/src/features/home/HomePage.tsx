import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Segment,
  Image,
  Divider,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegsiterForm from "../users/RegsiterForm";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header
              as='h2'
              inverted
              content={`Welcome back ${userStore.user?.displayName}`}
            />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size='huge'
              inverted>
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegsiterForm />)}
              size='huge'
              inverted>
              Register
            </Button>
            <Divider horizontal inverted>
              OR
            </Divider>
            <Button
              as={FacebookLogin}
              appId='801558481589808'
              size='huge'
              inverted
              color='facebook'
              content='Login with Facebook'
              loading={userStore.fbLoading}
              onSuccess={(response: any) => {
                userStore.facebookLogin(response.accessToken);
                console.log("Login Success", response);
              }}
              onFail={(response: any) => {
                console.log("Login Fail", response);
              }}
            />
          </>
        )}
      </Container>
    </Segment>
  );
});
