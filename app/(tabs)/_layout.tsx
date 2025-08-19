import { images } from '@/constants';
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/types/type';
import { Redirect,Tabs } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native';
import cn from 'clsx';

const TabBarIcon = ({focused,icon,title}: TabBarIconProps) =>(
    <View className="tab-icon">
        <Image source={icon} className="size-7"resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
    <Text className={cn('text-sm font-bold', focused ? 'text-primary': 'text-gray-200')}>{title}</Text>
    </View>
)



export default function TabLayout() {
    const {isAuthenticated} = useAuthStore();

    if(!isAuthenticated) return <Redirect href="/sign-in" />
    
    return (
    <Tabs
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            marginHorizontal: 20,
            height: 80,
            position: 'absolute',
            bottom: 40,
            backgroundColor: 'white',
            shadowColor: '#1a1a1a',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
    }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({focused}) => <TabBarIcon title="Home" focused={focused} icon={images.home} />,
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        android_ripple={{color: "transparent"}}
                        style={props.style}
                    />
                ),
            }}
         />
           <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Search" focused={focused} icon={images.search} />,
                    tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        android_ripple={{color: "transparent"}}
                        style={props.style}
                    />
                ),
                    
                }}
         />
           <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Cart" focused={focused} icon={images.bag} />,
                    tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        android_ripple={{color: "transparent"}}
                        style={props.style}
                    />
                ),
                }}
         />
           <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Profile" focused={focused} icon={images.person} />,
                    tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        android_ripple={{color: "transparent"}}
                        style={props.style}
                    />
                ),
                }}
         />

    </Tabs>
    );
}