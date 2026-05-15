"use client"

interface TagsProps {
    tags: string[]
    selectedTags: string[]
    onToggle: (tag: string) => void
}

const Tags = ({ tags, selectedTags, onToggle }: TagsProps) => {
    return (
        <div id="task-tags">
            <div className="fw-bolder text-purple mb-2">Tags</div>

            <div className="b-tags">
                {tags.map((tag, index) => {
                    const isSelected = selectedTags.includes(tag)

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onToggle(tag)}
                            className={`btn badge ${
                                isSelected ? "selected" : ""
                            }`}
                        >
                            {tag}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Tags