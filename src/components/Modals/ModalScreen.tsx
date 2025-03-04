import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/appTheme';
import { Modal } from 'react-native-paper';


interface ModalScreenInterface {
    children: ReactNode;
    onClose: () => void;
    visible: boolean
}

const ModalScreen = ({
    children,
    onClose,
    visible
}: ModalScreenInterface) => {

    const { theme } = useTheme();

    return visible ? (

        <Modal
            visible={visible}
            onDismiss={onClose}
            contentContainerStyle={{ flex: 1, justifyContent: "flex-start", height: '100%', zIndex: 999 }} // Añadir esto        
        >

            <View style={{
                flex: 1,
                /* position: 'absolute',
                bottom: 0,
                left: 0,


                backgroundColor: theme?.background_color,
                shadowColor: theme?.background_color_tertiary,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                width: "100%",
                borderRadius: globalStyles(theme).borderRadius.borderRadius,
                borderWidth: 1,
                borderColor: theme?.color_border,
                zIndex: 9999999 */
            }}>
                <View
                    style={{
                        backgroundColor: theme.background_color,
                        borderTopRightRadius: 10,
                        borderTopStartRadius: 10,
                        paddingHorizontal: globalStyles().globalPadding.padding,
                        paddingVertical: globalStyles().globalPadding.padding / 2,
                        borderBottomWidth: 0.2,
                        borderBottomColor: theme.color_border
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "flex-end"
                        }}
                        onPress={onClose}
                    >
                        <Icon name="close-outline" size={24} color={theme.text_color} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        height: "100%",
                        padding: globalStyles().globalPadding.padding
                    }}
                >
                    {children}
                </View>
            </View>
        </Modal>
    ) : null
}

export default ModalScreen