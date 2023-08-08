// Importing the required modules and components
import supabase from "../../src/config/supabaseClient"; 
import { ThemeSupa } from '@supabase/auth-ui-shared'; 
import { Auth } from '@supabase/auth-ui-react';
import { useEffect, useState } from "react";

// Defining the functional component Signin and passing a prop onLogin
export default function Signin({ onLogin }) {

// Using the useState hook to manage the session state
    const [session, setSession] = useState(null);

// Using the useEffect hook to perform side effects after component render
    useEffect(() => {

// Fetching the current session using the supabase client
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session); // Updating the session state with the fetched session
    });

// Subscribing to changes in the authentication state using onAuthStateChange
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session); // Updating the session state with the changed session
            if (session) {
                onLogin(); // Calling the onLogin function if the session is not null (i.e., user is authenticated)
            }
        });

// Returning a cleanup function to unsubscribe from the subscription when the component unmounts
        return () => subscription.unsubscribe();
    }, [onLogin]); // The effect will run when onLogin prop changes

// Rendering the Auth component from the auth-ui-react package
// This component provides authentication UI and uses the provided supabase client and appearance settings
    if (!session) {
        return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['discord']} theme='dark' />;
    }
}
