import { useUser } from "hooks/useUser"

const Index = () => {
    const { user, status  } = useUser();

    return (
        <div className="iw-text-blue-400 iw-text-xl">
            {
                status === 0 && <h3>Loading</h3>
            }

            {
                status === 1 && <h3>Hey {user.username}</h3>
            }

            {
                status === 2 && <h3>No authenticated</h3>
            }
        </div>
    )
}

export default Index;