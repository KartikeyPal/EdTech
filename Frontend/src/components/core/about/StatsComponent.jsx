import React from 'react'
const stats = [
    {
        count: "5K",
        label: "Active Students",
    },
    {
        count: "10+",
        label: "Mentors",
    },
    {
        count: "200+",
        label: "Courses",
    },
    {
        count: "50+",
        label: "Awards",
    },

]
const StatsComponent = () => {
  return (
    <section>
        <div>
            <div className='flex gap-x-4'>
                {
                    stats.map((ele,ind)=>(
                        <div key={ind} className=''>
                            <h1>{ele.count}</h1>
                            <h1>{ele.label}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
