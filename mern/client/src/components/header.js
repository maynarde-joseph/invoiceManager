import { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Image,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
    Title
} from '@mantine/core';


export function HeaderResponsive() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <Header height={{ base: 100, md: 90 }} p="md" >
            <div style={{alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>


                <Group position="together">
                    <Link to="/home"><Image maw={240} mx="auto" radius="md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcR8e_yA4Ygw0t5lajsrynr1yjmnTq66JoQQ&usqp=CAU" width="50px" /> </Link>
                    <Title order={3} size="h1">ApplePie</Title>
                </Group>

            </div>
        </Header>
    )
}