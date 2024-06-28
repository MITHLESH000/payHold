
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



export default function AdminProductPage() {
    return (
        <>
            <div className="flex justify-center items-cente min-h-screen bg-slate-300 text-gray-900 ">
                <div className="m-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </>
    );
}
