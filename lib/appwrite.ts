import { CreateUserPrams, SignInParams } from "@/types/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.adam.food",
    databaseId: "68a2d3e300280569affd",
    userCollectionId: '68a2d448002ef05b29f1',
}

export const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const signIn= async ({email,password}: SignInParams)=>{

    try{
        const session = await account.createEmailPasswordSession(email,password);
    } catch(e){
        throw new Error(e as string)
    }

}

export const createUsers = async ({email,password,name}:CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(),email,password,name);
        if(!newAccount) throw Error;

        await signIn({email,password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {email,name,accountId:newAccount.$id,avatar: avatarUrl}
        );

        
    } catch(e){
        throw new Error(e as string);
    }
};


export const getCurrentUser = async() => {
    try {
        const currentAccount= await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch(e){
        console.log(e);
        throw new Error(e as string);
    }
}