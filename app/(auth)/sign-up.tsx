import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { createUsers } from '@/lib/appwrite';

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name:'',email: '',password:''});

  const submit = async() => {

    const {name,email,password} = form;
    if(!name || !email || !password) return Alert.alert('Error','Please enter valid email address and password');

    setIsSubmitting(true)
    
    try{
      await createUsers({
        email,
        password,
        name,
      })
      router.replace('/');

    }catch(error:any){
      
      Alert.alert('Error',error.message);
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(value)=>{setForm({...form,name:value})}}
        label="Full name"
        />
        <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(value)=>{setForm({...form,email:value})}}
        label="Email"
        keyboardType="email-address"
        />
        <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(value)=>{setForm({...form,password:value})}}
        label="Password"
        secureTextEntry={true}
        />
        <CustomButton 
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
        />
        <View className="flex justify-center flex-row mt-5 gap-2">
          <Text className="base-regular text-gray-100">
            Already have an account?
          </Text>
          <Link href="/sign-in" className="base-bold text-primary">
          Sign In
          </Link>
        </View>
    </View>
  )
}

export default SignUp