import { COMMON_PROGRAMS } from "@/data/prefill";

const TestPage = () => {
    return (
        <div>
            [
                {
                COMMON_PROGRAMS.map((item, index)=><div key={index}>
                    {"{"}
                    id: {index+1},
                    name: "{item.name}",
                    categoryId: {item.categoryId+1}
                    {"}"},
                  
                    
                </div> )
            }
            ]
        </div>
    );
}

export default TestPage;