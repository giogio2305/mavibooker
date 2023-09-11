import React from 'react'
import FormCard from '../components/FormCard'
import Field from '../components/Field';

function Login() {
    document.title = "Mavibooker - Login";
    const formprops = {
        title: "Login to your account",
        subtitle: "Enter your details to login.",
        isOauth: true,
        isSubmit: true,
        submit: 'Login',
        reditext: "Don’t have an account ? ",
        link: 'Register',
        linkpath: '/'
    }
  return (
<div className="w-full h-[100vh] bg-grid bg-cover bg-center bg-no-repeat flex flex-col p-0 m-0 box-border font-PJS">
<FormCard title={formprops.title} subtitle={formprops.subtitle} isOauth={formprops.isOauth} isSubmit={formprops.isSubmit} submit={formprops.submit} reditext={formprops.reditext} link={formprops.link} linkpath={formprops.linkpath}>
    <Field label='Email Address' type='email' pldr='johnd@example.com' hlpt='The username must contains upper and lower'/>
    <Field label='Password' forgot type='password' pldr='8 + characters' hlpt='The username must contains upper and lower'/>
</FormCard>
</div>
  )
}

export default Login