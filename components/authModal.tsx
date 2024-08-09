import { AuthStrategy, ModalType } from "@/types/enums";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";

import { Ionicons } from "@expo/vector-icons";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    authType: ModalType | null;
};

const LOGIN_OPTION = [
    {
        text: "Continue with Apple",
        icon: require("@/assets/images/login/apple.png"),
        strategy: AuthStrategy.Apple,
    },
    {
        text: "Continue with Google",
        icon: require("@/assets/images/login/google.png"),
        strategy: AuthStrategy.Google,
    },
    {
        text: "Continue with Microsoft",
        icon: require("@/assets/images/login/microsoft.png"),
        strategy: AuthStrategy.Microsoft,
    },
];

const AuthModal = ({ authType }: Props) => {
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();
    const { startOAuthFlow: appleAuth } = useOAuth({
        strategy: AuthStrategy.Apple,
    });
    const { startOAuthFlow: googleAuth } = useOAuth({
        strategy: AuthStrategy.Google,
    });
    const { startOAuthFlow: microsoftAuth } = useOAuth({
        strategy: AuthStrategy.Microsoft,
    });

    const onSelectedStrategy = async (strategy: AuthStrategy) => {
        if (!signIn || !signUp) return;
        const selectedAuth = {
            [AuthStrategy.Apple]: appleAuth,
            [AuthStrategy.Google]: googleAuth,
            [AuthStrategy.Microsoft]: microsoftAuth,
        }[strategy];
        try {
            const { createdSessionId, setActive } = await selectedAuth();

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                console.log("sessionCreated!")
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <BottomSheetView style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalButton}>
                <Ionicons name="mail-outline" size={20} />
                <Text style={styles.buttontext}>
                    {authType === ModalType.Login
                        ? "Log in with email"
                        : "Signup with eamil"}
                </Text>
            </TouchableOpacity>
            {LOGIN_OPTION.map((option) => (
                <TouchableOpacity
                    key={option.strategy}
                    style={styles.modalButton}
                    onPress={() => onSelectedStrategy(option.strategy)}
                >
                    <Image source={option.icon} style={styles.icon} />
                    <Text style={styles.buttontext}>{option.text}</Text>
                </TouchableOpacity>
            ))}
        </BottomSheetView>
    );
};
export default AuthModal;

const styles = StyleSheet.create({
    modalContainer: {
        display: "flex",
        alignItems: "flex-start",
        padding: 20,
        gap: 20,
    },
    modalButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    buttontext: {
        fontSize: 18,
    },
    icon: {
        width: 20,
        height: 20,
    },
});
