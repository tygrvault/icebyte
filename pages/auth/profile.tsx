import ProtectedPage from "@/components/auth/ProtectedPage";

export default function ProfilePage() {
    return (
        <>
            <ProtectedPage>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-col max-w-[1400px] items-start justify-start w-full gap-4 p-4 sm:px-8 sm:pt-4">
                        <div className="flex-col items-center gap-0">
                            <h1 className="text-4xl font-bold">
                                Profile
                            </h1>
                            <p className="text-primary-500">
                                Manage your style and how you look to others on Icebyte!
                            </p>
                        </div>
                    </div>
                </div>
            </ProtectedPage>
        </>
    )
}