import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/config/firabase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

 const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        if (credentials?.username && credentials.password) {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              credentials.username,
              credentials.password
            );          
            
            // Return user object as required by NextAuth
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
            };
          } catch (error) {
            console.error("Error signing in with credentials:", error);
            // Authentication failed
            return null;
          }
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Include the user ID in the session if needed
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', { user, account, profile, email, credentials });
      // Check if the user is signing in with Google
      if (account?.provider === 'google') { 
        // You can add custom sign-in logic here if needed
        // For example, check if the user exists in your database
        const usersRef = collection(db, 'USERS');
        const q = query(usersRef, where('email', '==',user.email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // User does not exist, you can create a new user
          addDoc(usersRef, 
            {email: user.email,isActive:true,role:'student'}  )
          
           
        }
      }
      return true;
      // You can add custom sign-in logic here if needed
      // Return true to allow sign-in, false to deny it
    }


  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };