"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Dialogs } from "@/lib/types"
import GitHubIcon from '@/app/icons/github-icon';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email",
    }),
    password: z.string().min(7, 'Password must contain at least 7 letters'),
    passwordConfirm: z.string()
})
    .refine(data => data.password === data.passwordConfirm, {
        message: "Passwords must match",
        path: ["passwordConfirm"],
    });


interface Props {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDialog: React.Dispatch<React.SetStateAction<Dialogs>>,
    children: React.ReactNode

}

const RegisterDialog: React.FC<Props> = ({
    isOpen,
    setIsOpen,
    setShowDialog,
    children
}) => {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        }
    })

    const onChange = () => {
        setIsOpen(!isOpen)
    }
    const onLogin = () => setShowDialog('login')

    const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            }).then((res) => {
                setIsLoading(false)
                if (res.error) {
                    console.log(res.error)
                }
                else {
                    router.refresh()
                    console.log('logged in');
                    setIsOpen(false)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const onSigninWithGithub = async () => {
        try {
            setIsLoading(true)
            supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                }
            }).then((res) => {
                setIsLoading(false)
                if (res.error) {
                    console.log(res.error)
                }
                else {
                    router.refresh()
                    setIsOpen(false)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center mb-2">Register</DialogTitle>
                    <DialogDescription className="text-center">
                        Register to save your data
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isLoading}
                                            placeholder="Enter your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isLoading}
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm your password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isLoading}
                                            placeholder="Confirm your password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-[100%]" type="submit" disabled={isLoading}>Register</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <Button className="w-[100%]" disabled={isLoading} onClick={onSigninWithGithub}><GitHubIcon className="mr-2" /> Sign in with github</Button>
                </DialogFooter>
                <div className="border-t flex justify-around pt-2">
                    <p
                        onClick={onLogin}
                        className="w-auto cursor-pointer text-muted-foreground text-sm">Already have an account?<span className="text-white"> Login here</span>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog