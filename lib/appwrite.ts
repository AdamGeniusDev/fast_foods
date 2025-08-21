import { CreateUserPrams, GetMenuParams, SignInParams } from "@/types/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: 'com.adam.food',
    databaseId: '68a2d3e300280569affd',
    bucketId: '68a5672300230936533d',
    userCollectionId: '68a2d448002ef05b29f1',
    categoriesCollectionId: '68a4421c003c76fd7912',
    menuCollectionId: '68a442df0025c2f502cc',
    customizationsCollectionId: '68a444e20018d8ef6878',
    menuCustomizationsCollectionId:'68a446190033104fff78',
}

export const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
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

export const getMenu = async({category,query}:GetMenuParams) => {
    try{
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories',category));
        if(query) queries.push(Query.search('name',query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )
        return menus.documents;

    } catch(e){
        throw new Error(e as string);
    }
}

export const getCategories = async() => {
    try{
        const categories= await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        )
        return categories.documents;

    }catch(e){
        throw new Error(e as string);
    }
}