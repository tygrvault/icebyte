import ProtectedPage from "@/components/auth/ProtectedPage";

export default function AccountPage() {
    return (
        <>
            <ProtectedPage>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-col max-w-[1400px] items-start justify-start w-full gap-4 p-4 sm:px-8 sm:pt-4">
                        <div className="flex-col items-center gap-0">
                            <h1 className="text-4xl font-bold">
                                Account
                            </h1>
                            <p className="text-primary-500">
                                Manage your preferences, settings and everything in between.
                            </p>
                        </div>
                    </div>
                </div>
            </ProtectedPage>
        </>
    )
}