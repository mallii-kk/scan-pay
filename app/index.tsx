import AuthModal from "@/components/authModal"
import { Colors } from "@/constants/Colors"
import { ModalType } from "@/types/enums"
import { useActionSheet } from "@expo/react-native-action-sheet"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import * as WebBrowser from 'expo-web-browser'
import { useCallback, useMemo, useRef, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
const HomeScreen = () => {
    const { top } = useSafeAreaInsets()
    const { showActionSheetWithOptions } = useActionSheet()
    const buttomSheetmodalRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['33%'], []);
    const [authType, setAuthType] = useState<ModalType | null>(null)
    const openActionSheet = () => {
        const options = ["View support docs", "Contact us", "Cancel"]
        const cancelButtonIndex = 2;
        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
        }, (selectedIndex) => {
            console.log({ selectedIndex })
        })
    }
    const openLink = () => {
        WebBrowser.openBrowserAsync("https://www.google.com/")
    }
    const showmodal = async (type: ModalType) => {
        setAuthType(type)
        buttomSheetmodalRef.current?.present();
    }

    const renderBackDrop = useCallback((props: any) => (
        <BottomSheetBackdrop
            opacity={0.2}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
            onPress={buttomSheetmodalRef?.current?.close()}
        />
    ), [])
    return (
        <BottomSheetModalProvider>
            <View
                style={[styles.container, {
                    paddingTop: top + 20
                }]}

            >
                {/* <Image style={styles.image} source={require('@/assets/images/login/Designer.jpeg')}></Image> */}
                <Text style={styles.heading}>Revolutionize Your Shopping: Scan, Add, and Pay with a Tap!</Text>

                <View style={styles.buttomContainer}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.secondary }]}
                        onPress={() => showmodal(ModalType.Login)}
                    >
                        <Text style={[styles.text]}> Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,]}
                        onPress={() => showmodal(ModalType.SignUp)}
                    >
                        <Text style={[styles.text, { color: Colors.secondary }]}> Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={styles.descriptions}>
                        By signing up, you agree to the  {' '}
                        <Text onPress={openLink} style={styles.link}>
                            User Notice
                        </Text>
                        {' '} and {' '}
                        <Text onPress={openLink} style={styles.link}>
                            Privacy Policy.
                        </Text>
                    </Text>
                    <Text onPress={openActionSheet} style={styles.link}>
                        Cant't Login or Signup.
                    </Text>
                </View>
            </View>
            <BottomSheetModal
                ref={buttomSheetmodalRef}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackDrop}
            >
                <View>
                    <AuthModal authType={authType}></AuthModal>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: "800",
        color: Colors.secondary,
    },
    image: {
        resizeMode: 'contain',
    },
    text: {
        fontSize: 15
    },
    textCenter: {
        color: 'white'
    },
    buttomContainer: {
        gap: 30,
        width: '100%',
        paddingHorizontal: 30,
        height: '80%',
        display: 'flex',
        justifyContent: "flex-end",
    },
    btn: {
        padding: 15,
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
    },
    descriptions: {
        fontSize: 14,
        textAlign: "center",
        color: Colors.secondary
    },
    link: {
        fontSize: 14,
        textDecorationLine: 'underline',
        textAlign: "center",
        color: Colors.secondary
    }
})

export default HomeScreen


