function SkillInput({
  newSkill,
  handleChange,
  handleAddSkill,
  formData,
  handleRemoveSkill,
}) {
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      <div className=" xl:pr-4">
        {/* New skill input */}
        <label htmlFor="skills" className="text-2xl mr-2">
          Skills:
        </label>
        <div className="grid sm:grid-cols-2 gap-2 md:gap-4">
          <label htmlFor="newSkill" className="sr-only">
            Add Skill
          </label>
          <input
            id="newSkill"
            name="newSkill"
            type="text"
            value={newSkill}
            onChange={handleChange}
            placeholder="Add a skill"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Skill
          </button>
        </div>
      </div>
      <div className=" xl:pl-4">
        {/* Display entered skills */}
        <div className="flex flex-wrap mt-2">
          {formData.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 p-2 rounded-md mr-2 mb-2 flex items-center"
            >
              <div className="mr-2">{skill}</div>
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="text-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillInput;
